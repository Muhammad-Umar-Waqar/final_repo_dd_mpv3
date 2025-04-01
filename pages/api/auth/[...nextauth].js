import nextAuthPkg from 'next-auth';
import credentialsPkg from 'next-auth/providers/credentials';
import { connectToDatabase } from "../../../lib/mongodb.js";
import bcrypt from "bcryptjs";

// Handle different import patterns
const NextAuth = nextAuthPkg.default || nextAuthPkg;
const CredentialsProvider = credentialsPkg.default || credentialsPkg;


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
    
        const { db } = await connectToDatabase();
        const user = await db.collection("users").findOne({ email: credentials?.email });
      
        if (!user) throw new Error("User not found");
       
      
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) throw new Error("Invalid credentials");
      
        return { id: user._id.toString(), email: user.email, role: user.role,  premiumExpiresAt: user.premiumExpiresAt || null };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.premiumExpiresAt = user.premiumExpiresAt || null;
      }
      if(trigger=="update") {
        return {...token, ...session.user }
      }
      return token;
    },
    async session({ session, token }) {
     // If user is premium and a premium expiration exists, check if it is expired
     if (token.role === "premium" && token.premiumExpiresAt) {
      const expiry = new Date(token.premiumExpiresAt);
      const now = new Date();
      if (now > expiry) {
        // Subscription has expired: downgrade user role
        session.user.role = "basic";
        // Optionally, remove premiumExpiresAt from session as well
        session.user.premiumExpiresAt = null;
        // Also update token to reflect this change
        token.role = "basic";
        token.premiumExpiresAt = null;

        try {
          const { db } = await connectToDatabase();
          await db.collection("users").updateOne(
            { email: session.user.email },
            { $set: { role: "basic" }, $unset: { premiumExpiresAt: "" } }
          );
        } catch (error) {
          console.error("Error updating user subscription:");
          // Optionally, handle the error further (e.g., add a fallback, notify an admin, etc.)
        }
         
      } else {
        session.user.role = token.role;
        session.user.premiumExpiresAt = token.premiumExpiresAt;
        console.log("Not Passed!")
      }
    } else {
      session.user.role = token.role || "basic";
    }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
};

export default NextAuth(authOptions);



