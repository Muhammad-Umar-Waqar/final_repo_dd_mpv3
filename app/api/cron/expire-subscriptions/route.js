// pages/api/cron/expire-subscriptions.js
import { connectToDatabase } from '../../../../lib/mongodb';

export default async function handler(req, res) {
  // Check for the secret in headers or query params
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
  
  try {
    const { db } = await connectToDatabase();
    const now = new Date();

    // Find all users whose premiumExpiresAt is set and in the past,
    // and update their role to "basic" and clear premiumExpiresAt
    const result = await db.collection("users").updateMany(
      { premiumExpiresAt: { $lte: now } },
      { $set: { role: "basic" }, $unset: { premiumExpiresAt: "" } }
    );
    console.log("CRON EXECUTED");
    return res.status(200).json({ message: "Subscription expiration job executed", result });
  } catch (error) {
    console.error("Error in subscription expiration cron job:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


