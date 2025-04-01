// pages/api/analytics/event.js
import { trackEvent } from '../../../lib/pirsch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, duration, meta, url } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Event name is required' });
    }

    // Create a modified request object with the URL from the client if provided
    const modifiedReq = { ...req };
    if (url) {
      // If client provided a URL, use it
      modifiedReq.url = url;
    }

    // Pass the request object to trackEvent so it can extract URL and IP
    // Only track in production unless explicitly testing
    if (process.env.NODE_ENV === 'production' || req.query.test === 'true') {
      await trackEvent(name, duration || 0, meta || {}, modifiedReq);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking event:');
    return res.status(500).json({ error: 'Failed to track event' });
  }
}
