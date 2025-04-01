// This endpoint is built using the App Router
import { NextResponse } from 'next/server';
import { expireSubscriptions } from '../../../lib/cronLogic';

export async function GET(request) {
  // Check for the Authorization header with Bearer token
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
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
