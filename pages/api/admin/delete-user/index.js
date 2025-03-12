import { connectToDatabase } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { db } = await connectToDatabase();
    const { userId, locale } = req.body;

    if (!userId) {
      return res.status(400).json({ 
        message: locale === "es" ? "ID de usuario no proporcionado." : "User ID is required." 
      });
    }

    const objectId = new ObjectId(userId);

    // Check if user exists
    const user = await db.collection("users").findOne({ _id: objectId });
    if (!user) {
      return res.status(404).json({ 
        message: locale === "es" ? "Usuario no encontrado." : "User not found." 
      });
    }

    // Delete the user
    await db.collection("users").deleteOne({ _id: objectId });

    return res.status(200).json({ 
      message: locale === "es" ? "Usuario eliminado con éxito." : "User deleted successfully." 
    });

  } catch (error) {
  
    return res.status(500).json({ 
      message: locale === "es" ? "Error al eliminar el usuario." : "Error deleting user." 
    });
  }
}
