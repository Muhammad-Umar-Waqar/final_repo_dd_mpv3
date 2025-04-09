
import { connectToDatabase } from "../../../lib/mongodb"; // Adjust path as needed

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Connect to the database
    const { db } = await connectToDatabase();
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    // Find user by token
    const user = await db.collection("users").findOne({ verificationToken: token });
  
    
    if (!user || user.verificationTokenExpires < Date.now()) {
      return res.status(400).json({ message: "Verification token is invalid or expired" });
    }

    // Update user to verified
    const updatedUser = await db.collection("users").findOneAndUpdate(
      { verificationToken: token },
      { 
        $set: { isVerified: true }, 
        $unset: { verificationToken: "", verificationTokenExpires: "" } 
      },
      { returnDocument: "after" } // Return updated user
    );

    if (!updatedUser.value) {
      return res.status(400).json({ message: "Error updating user verification status" });
    }

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:");
    return res.status(500).json({ message: "Error verifying email" });
  }
}
