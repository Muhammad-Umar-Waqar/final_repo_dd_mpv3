import { connectToDatabase } from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import mailjet from "node-mailjet";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { db } = await connectToDatabase();
    const { name ,email, password, role, locale = "en" } = req.body;

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: locale === "es" ? "El correo electrónico ya está en uso." : "Email is already in use.", });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create user object
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role,
      isVerified: false,
      verificationToken,
      verificationTokenExpires: Date.now() + 3600000, // Token expires in 1 hour
    };

    // Insert user into database
    await db.collection("users").insertOne(newUser);

    // Mailjet Client Setup
    const mailjetClient = mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );

    const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

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
              Name: name || "User" ,
            },
          ],
          Subject: "Verify Your Email",
          HTMLPart: `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`,
        },
      ],
    };

    try {
      const result = await mailjetClient.post("send", { version: "v3.1" }).request(emailData);
      console.log("Email Sent: ", result.body);
    } catch (emailError) {
      console.error("Error sending verification email:", emailError);
      return res.status(500).json({ message: locale === "es" ? "Error al enviar correo de verificación." : "Error sending verification email." });
    }
   
  
    return res.status(201).json({
      message: locale === "es" ? "Registro exitoso. Se ha enviado un correo de verificación." : "Registration successful. A verification email has been sent.",
      redirectUrl: "/premium",
    });

  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({  message: locale === "es" ? "Error al registrar el usuario." : "Error Registering User.", });
  }
}
