// pages/api/paypal/create-order.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";


// For Node 18+, you can use fetch directly. For older versions, consider 'node-fetch'.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Check user session if you want only logged-in users to create orders
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Price selection logic (for example: 1 month = $5, 4 months = $15)
    const { productType } = req.body; // e.g. "1month" or "4months"
    let price = 5.0; // default
    if (productType === "4months") {
      price = 15.0;
    }
    console.log("productTypeFromCreateOrder", productType)
    // Get client ID/secret from environment
    const { NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
    // 1) Get OAuth token
    const basicAuth = Buffer.from(`${NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const authResponse = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"
    });
    const { access_token } = await authResponse.json();

    // 2) Create the order
    const orderResponse = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: price.toFixed(2)
            },
            description: productType
          }
        ]
      })
    });

    if (!orderResponse.ok) {
      const message = await orderResponse.text();
      return res.status(400).json({ error: "Failed to create PayPal order", details: message });
    }

    const orderData = await orderResponse.json();
    return res.status(200).json(orderData);
  } catch (error) {
    console.error("PayPal Create Order Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
