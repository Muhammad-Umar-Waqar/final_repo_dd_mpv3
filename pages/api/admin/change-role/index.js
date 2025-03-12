import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { db } = await connectToDatabase();
    const { userId, newRole, locale = "en" } = req.body;

    // Validate required fields
    if (!userId || !newRole) {
      return res.status(400).json({ 
        message: locale === "es" ? "Datos Incompletos." : "Missing Required Fields." 
      });
    }

    // Check if user exists
    const userObjectId = new ObjectId(userId);
    const user = await db.collection("users").findOne({ _id: userObjectId });
  
    if (!user) {
      return res.status(404).json({ 
        message: locale === "es" ? "Usuario no encontrado." : "User Not Found." 
      });
    }

    // Update user role
    await db.collection("users").updateOne(
      { _id: userObjectId },
      { $set: { role: newRole } }
    );

    return res.status(200).json({ 
      message: locale === "es" ? "Rol actualizado con éxito." : "Role updated successfully." 
    });

  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({ 
      message: req.body?.locale === "es" ? "Error al actualizar el rol." : "Error updating role." 
    });
  }
}
