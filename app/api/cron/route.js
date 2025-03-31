// // pages/api/cron/expire-subscriptions.js
// import { connectToDatabase } from '../../../../lib/mongodb';

// export default async function handler(req, res) {
//   // Check for the secret in headers or query params
//   const authHeader = request.headers.get('authorization');
//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return new Response('Unauthorized', {
//       status: 401,
//     });
//   }
  
//   try {
//     const { db } = await connectToDatabase();
//     const now = new Date();

//     // Find all users whose premiumExpiresAt is set and in the past,
//     // and update their role to "basic" and clear premiumExpiresAt
//     const result = await db.collection("users").updateMany(
//       { premiumExpiresAt: { $lte: now } },
//       { $set: { role: "basic" }, $unset: { premiumExpiresAt: "" } }
//     );
//     console.log("CRON EXECUTED");
//     return res.status(200).json({ message: "Subscription expiration job executed", result });
//   } catch (error) {
//     console.error("Error in subscription expiration cron job:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }


// export function GET(request, response) {
// //   const authHeader = request.headers.get('authorization');
// //   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
// //     return new Response('Unauthorized', {
// //       status: 401,
// //     });
// //   }
//  console.log("CRON Job running")
//   return response.json("cron jobs ran", { success: true });
// }





// export function GET(request) {
//   const authHeader = request.headers.get('authorization');
//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return new Response('Unauthorized', {
//       status: 401,
//     });
//   }
 
//   return Response.json("Job run", { success: true });
// }




// This endpoint is built using the App Router
import { NextResponse } from 'next/server';
import { expireSubscriptions } from '../../../lib/cronLogic';

export async function GET(request) {
  // Check for the Authorization header with Bearer token
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.log("CRON SECRET NOT FOUND!");
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  try {
    const result = await expireSubscriptions();
    console.log("CRON EXECUTED!");
    return NextResponse.json({ message: "Subscription expiration job executed", result });
  } catch (error) {
    console.error("Error in subscription expiration cron job:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
