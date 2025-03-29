// pages/api/analytics/event.js
import { trackEvent } from '../../../lib/pirsch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, duration, meta } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Event name is required' });
    }

    if (process.env.NODE_ENV === 'production') {
      await trackEvent(name, duration || 0, meta || {});
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return res.status(500).json({ error: 'Failed to track event' });
  }
}
