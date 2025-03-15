// // pages/api/paypal/capture-order.js
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../auth/[...nextauth]";
// import { connectToDatabase } from "../../../../lib/mongodb";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     // 1) Validate session
//     const session = await getServerSession(req, res, authOptions);
//     if (!session) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // 2) Capture the order
//     const { orderID } = req.body;
//     const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

//     // Get OAuth token
//     const basicAuth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
//     const authResponse = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
//       method: "POST",
//       headers: {
//         "Authorization": `Basic ${basicAuth}`,
//         "Content-Type": "application/x-www-form-urlencoded"
//       },
//       body: "grant_type=client_credentials"
//     });
//     const { access_token } = await authResponse.json();

//     // Capture Payment
//     const captureRes = await fetch(
//       `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${access_token}`
//         }
//       }
//     );

//     if (!captureRes.ok) {
//       const message = await captureRes.text();
//       return res.status(400).json({ error: "Failed to capture PayPal order", details: message });
//     }

//     const captureData = await captureRes.json();

//     // 3) Mark user as premium in DB
//     const { db } = await connectToDatabase();
//     await db.collection("users").updateOne(
//       { email: session?.user?.email },
//       { $set: { role: "premium" } }
//     );

//     return res.status(200).json({ captureData, message: "Payment captured. User upgraded to premium." });
//   } catch (error) {
//     console.error("PayPal Capture Order Error:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }





// pages/api/paypal/capture-order.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Validate user session
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get orderID and productType from the request body.
    // productType should be "1month" or "4month"
    const { orderID, productType } = req.body;
    console.log("productTypeFromcaptureOrder", productType)
    // Get PayPal credentials from environment
    const { NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
    const basicAuth = Buffer.from(`${NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");

    // 1) Get OAuth token from PayPal
    const authResponse = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"
    });
    const authData = await authResponse.json();
    const access_token = authData.access_token;
    if (!access_token) {
      return res.status(400).json({ error: "Unable to retrieve access token" });
    }

    // 2) Capture the PayPal order
    const captureResponse = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`
        }
      }
    );
    if (!captureResponse.ok) {
      const message = await captureResponse.text();
      return res.status(400).json({ error: "Failed to capture PayPal order", details: message });
    }

    const captureData = await captureResponse.json();

    // 3) Calculate premium expiration based on productType
    const now = new Date();
    let premiumExpiresAt = null;
    if (productType === "1month") {
      // Add one month
      premiumExpiresAt = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    } else if (productType === "4months") {
      // Add four months
      premiumExpiresAt = new Date(now.getFullYear(), now.getMonth() + 4, now.getDate());
    } else {
      // Default fallback; you can adjust this logic if needed.
      premiumExpiresAt = now;
    }

    console.log("PREMIUMEXPIRESAT>: ", premiumExpiresAt);
    console.log("ProductType2>: ", productType);

    // 4) Update the user in the database: set role to "premium" and store expiration date.
    const { db } = await connectToDatabase();
    await db.collection("users").updateOne(
      { email: session.user.email },
      { $set: { role: "premium", premiumExpiresAt: premiumExpiresAt } }
    );

    return res.status(200).json({
      captureData,
      message: "Payment captured and user upgraded to premium with expiration date."
    });
    
  } catch (error) {
    console.error("PayPal Capture Order Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
