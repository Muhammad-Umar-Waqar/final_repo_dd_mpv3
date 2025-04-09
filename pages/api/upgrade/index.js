import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth].js"; // Ensure the correct import path
import { connectToDatabase } from "../../../lib/mongodb";



export default async function handler(req, res) {
  
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Get session from server-side
    const session = await getServerSession(req, res, authOptions);
  

    if (!session) {
      return res.status(401).json({ error: "Unauthorized - No Session" });
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Update user's role to "premium"
    const updatedUser = await db.collection("users").findOneAndUpdate(
      { email: session?.user.email },
      { $set: { role: "premium" } },
      { returnDocument: "after" } // Returns the updated document
    );

    if (!updatedUser.value) {
      return res.status(404).json({ error: "User not found" });
    }
  
    return res.status(200).json({ message: "Upgraded to premium!", user: updatedUser.value,  refreshSession: true  });
  } catch (error) {
    console.error("Error in Upgrade API:");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
