import { connectToDatabase } from "../../../../lib/mongodb";
import crypto from "crypto";
import mailjet from "node-mailjet";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { db } = await connectToDatabase();
    const { email, locale = "en" } = req.body;

    const translations = {
      userNotFound: locale === "es" ? "Usuario no encontrado" : "User not found",
      alreadyVerified: locale === "es" ? "El usuario ya está verificado" : "User is already verified",
      emailSent: locale === "es"
        ? "¡Correo de verificación reenviado con éxito!"
        : "Verification email resent successfully!",
      emailError: locale === "es"
        ? "Error al reenviar el correo electrónico"
        : "Error resending email",
    };

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(400).json({ message: translations.userNotFound });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: translations.alreadyVerified });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = Date.now() + 3600000;

    await db.collection("users").updateOne(
      { email },
      { $set: { verificationToken, verificationTokenExpires } }
    );

    const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

    const mailjetClient = mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );

    const emailData = {
      Messages: [
        {
          From: { Email: "info@dediabetes.com", Name: "DeDiabetes Support" },
          To: [{ Email: email, Name: user.name || "User" }],
          Subject: locale === "es" ? "Reenviar: Verifica tu correo" : "Resend: Verify Your Email",
          HTMLPart:
            locale === "es"
              ? `<p>Haga clic <a href="${verifyUrl}">aquí</a> para verificar su correo electrónico.</p>`
              : `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`,
        },
      ],
    };

    await mailjetClient.post("send", { version: "v3.1" }).request(emailData);

    return res.status(200).json({ message: translations.emailSent });
  } catch (error) {
    console.error("Error resending email:");
    return res.status(500).json({ message: translations.emailError });
  }
}
