// lib/cronLogic.js

// Shared logic for expiring subscriptions
import { connectToDatabase } from './mongodb';

export async function expireSubscriptions() {
  const { db } = await connectToDatabase();
  const now = new Date();

  // Update users whose premiumExpiresAt is in the past
  const result = await db.collection("users").updateMany(
    { premiumExpiresAt: { $lte: now } },
    { $set: { role: "basic" }, $unset: { premiumExpiresAt: "" } }
  );
  return result;
}
