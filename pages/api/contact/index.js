import mailjet from "node-mailjet";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Extract name, email, message, and locale (defaulting to "en")
  const { name, email, message, locale = "en" } = req.body;

  try {
    // Mailjet Client Setup
    const mailjetClient = mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );

    const emailData = {
      Messages: [
        {
          From: {
            Email: "info@dediabetes.com", // Replace with your verified Mailjet sender email
            Name: "Dediabetes Support",
          },
          To: [
            {
              Email: "mohammthegreat@gmail.com", // Replace with your receiving email address
              Name: "Admin",
            },
          ],
          Subject: locale === "es" ? "Nuevo Mensaje de Contacto" : "New Contact Form Submission",
          HTMLPart: `
            <h3>${locale === "es" ? "Nuevo Mensaje de Contacto" : "New Contact Form Submission"}</h3>
            <p><strong>${locale === "es" ? "Nombre" : "Name"}:</strong> ${name}</p>
            <p><strong>${locale === "es" ? "Correo" : "Email"}:</strong> ${email}</p>
            <p><strong>${locale === "es" ? "Mensaje" : "Message"}:</strong> ${message}</p>
          `,
        },
      ],
    };

    const result = await mailjetClient
      .post("send", { version: "v3.1" })
      .request(emailData);
    console.log("Contact Form Email Sent:", result.body);

    return res.status(200).json({
      message:
        locale === "es"
          ? "¡Mensaje enviado con éxito!"
          : "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error sending contact form message:", error);
    return res.status(500).json({
      message:
        locale === "es"
          ? "Error al enviar el mensaje."
          : "Error sending message.",
    });
  }
}
