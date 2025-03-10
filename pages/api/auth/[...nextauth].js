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
      
        return { id: user._id.toString(), email: user.email, role: user.role};
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) token.role = user.role;
      if(trigger=="update") {
        return {...token, ...session.user }
      }
      return token;
    },
    async session({ session, token }) {
      // Always update the session user with the latest role from the token.
      session.user.role = token.role || 'basic';
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
};

export default NextAuth(authOptions);



