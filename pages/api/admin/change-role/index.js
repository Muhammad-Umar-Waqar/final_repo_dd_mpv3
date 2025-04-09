import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({
      message: req.body.locale === "es" ? "Método no permitido." : "Method Not Allowed."
    });
  }

  try {
    // Check for a valid token and verify that the requester is an admin.
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.email) {
      return res.status(401).json({
        message: req.body.locale === "es" ? "No autorizado." : "Unauthorized."
      });
    }
    const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
    if (!adminEmails.includes(token.email)) {
      return res.status(403).json({
        message: req.body.locale === "es" ? "Acceso denegado." : "Access denied."
      });
    }

    // Connect to the database.
    const { db } = await connectToDatabase();
    const { userId, newRole, premiumDuration, locale = "en" } = req.body;

    // Validate required fields.
    if (!userId || !newRole) {
      return res.status(400).json({
        message: locale === "es" ? "Datos Incompletos." : "Missing Required Fields."
      });
    }

    // Check if user exists.
    const userObjectId = new ObjectId(userId);
    const user = await db.collection("users").findOne({ _id: userObjectId });
    if (!user) {
      return res.status(404).json({
        message: locale === "es" ? "Usuario no encontrado." : "User Not Found."
      });
    }

    // Build update object based on the new role.
    let updateFields = { role: newRole };

    if (newRole === "basic") {
      // When switching to basic, remove premium expiration.
      updateFields.premiumExpiresAt = null;
    }

    if (newRole === "premium") {
      // premiumDuration should be provided and either 1 or 4 (months).
      if (
        premiumDuration !== 1 &&
        premiumDuration !== 4 &&
        premiumDuration !== "1" &&
        premiumDuration !== "4"
      ) {
        return res.status(400).json({
          message: locale === "es" ? "Duración de premium inválida." : "Invalid premium duration."
        });
      }
      const durationInMonths = Number(premiumDuration);
      const now = new Date();
      // Calculate expiration in UTC by using Date.UTC components.
      const newPremiumExpiresAt = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth() + durationInMonths,
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds()
        )
      );
      updateFields.premiumExpiresAt = newPremiumExpiresAt;
    }

    await db.collection("users").updateOne(
      { _id: userObjectId },
      { $set: updateFields }
    );

    return res.status(200).json({
      message: locale === "es" ? "Rol actualizado con éxito." : "Role updated successfully."
    });
  } catch (error) {
    console.error("Error updating user role:");
    return res.status(500).json({
      message: req.body?.locale === "es" ? "Error al actualizar el rol." : "Error updating role."
    });
  }
}
