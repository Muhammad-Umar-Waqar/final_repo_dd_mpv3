import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: getMessage("methodNotAllowed", req) });
  }

  try {
    const { db } = await connectToDatabase();
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: getMessage("missingFields", req) });
    }

    // Check password strength
    const strongPasswordRegex = /^.{8,}$/;
    
    if (!strongPasswordRegex.test(newPassword)) {
      return res.status(400).json({ message: getMessage("weakPassword", req) });
    }

    // Find user by reset token and check expiration
    const user = await db.collection("users").findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token is still valid
    });

    if (!user) {
      return res.status(400).json({ message: getMessage("invalidToken", req) });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and remove reset token
    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { resetPasswordToken: "", resetPasswordExpires: "" },
      }
    );

    return res.status(200).json({ message: getMessage("passwordUpdated", req) });
  } catch (error) {
    
    return res.status(500).json({ message: getMessage("serverError", req) });
  }
}

// Function to return messages based on the selected language
function getMessage(key, req) {
  const lang = req.headers["accept-language"]?.startsWith("es") ? "es" : "en";

  const messages = {
    en: {
      methodNotAllowed: "Method Not Allowed",
      missingFields: "Missing required fields",
      weakPassword: "Password must be at least 8 characters long",
      invalidToken: "Invalid or expired token",
      passwordUpdated: "Password updated successfully",
      serverError: "Internal Server Error",
    },
    es: {
      methodNotAllowed: "Método no permitido",
      missingFields: "Faltan campos obligatorios",
      weakPassword: "La contraseña debe tener al menos 8 caracteres",
      invalidToken: "Token inválido o expirado",
      passwordUpdated: "Contraseña actualizada exitosamente",
      serverError: "Error interno del servidor",
    },
  };

  return messages[lang][key];
}
