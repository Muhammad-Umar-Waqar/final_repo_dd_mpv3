import { connectToDatabase } from "../../../lib/mongodb";
import crypto from "crypto";
import mailjet from "node-mailjet";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { db } = await connectToDatabase();
    const { email, locale } = req.body;

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        message: locale === "es" ? "Usuario no encontrado" : "User not found" 
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000;

    await db.collection("users").updateOne(
      { email },
      { $set: { resetPasswordToken: resetToken, resetPasswordExpires } }
    );

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
   

    const mailjetClient = mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );

    const emailData = {
      Messages: [
        {
          From: {
            Email: "info@dediabetes.com", // Use your verified Mailjet sender email
            Name: "DeDiabetes Support",
          },
          To: [
            {
              Email: email,
              Name: user.name || "User",
            },
          ],
          Subject: locale === "es" ? "Solicitud de restablecimiento de contraseña" : "Password Reset Request",
          HTMLPart: `<p>${locale === "es" ? "Haz clic" : "Click"} <a href="${resetUrl}">${locale === "es" ? "aquí" : "here"}</a> ${locale === "es" ? "para restablecer tu contraseña." : "to reset your password."}</p>`,
        },
      ],
    };

    const result = await mailjetClient.post("send", { version: "v3.1" }).request(emailData);
   

    return res.status(200).json({ 
      message: locale === "es" ? "Enlace de restablecimiento enviado a tu correo electrónico" : "Reset link sent to email" 
    });
  } catch (error) {
    console.error("Error in forgot password:");
    return res.status(500).json({ 
      message: locale === "es" ? "Error interno del servidor" : "Internal Server Error" 
    });
  }
}
