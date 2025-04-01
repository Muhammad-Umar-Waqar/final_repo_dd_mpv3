



export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ 
        message: req?.body?.locale === "es" ? "Método no permitido" : "Method Not Allowed" 
      });
    }
  
    const { email, listId, locale } = req?.body;
    const endpoint = process.env.SENDY_ENDPOINT || 'https://sendy.dediabetes.com/subscribe';
   
  
    if (!email || !listId) {
      return res.status(400).json({ 
        message: locale === "es" ? "Correo electrónico o ID de lista faltante" : "Missing email or list ID" 
      });
    }
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email,
          list: listId,
          api_key: process.env.SENDY_APIKEY,
          boolean: "true",
        }),
      });
  
      const result = await response.text();
  
  
      // Check the result from Sendy:
      if (result === "1") {
        // New subscription successful
        return res.status(200).json({ 
          success: true, 
          message: locale === "es" ? "Suscripción exitosa" : "Subscription successful" 
        });
      } else if (result.toLowerCase().includes("already subscribed")) {
        // User is already subscribed
        return res.status(200).json({ 
          success: true, 
          message: locale === "es" ? "El usuario ya está suscrito" : "User is already subscribed" 
        });
      } else {
        return res.status(400).json({ 
          success: false,
          message: locale === "es" ? "Error en la suscripción" : "Subscription failed" 
        });
      }
    } catch (error) {
      console.error("Subscription Error:");
      return res.status(500).json({ 
        message: locale === "es" ? "Error interno del servidor" : "Internal Server Error" 
      });
    }
  }
  