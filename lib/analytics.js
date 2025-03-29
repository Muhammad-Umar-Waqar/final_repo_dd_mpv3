// lib/analytics.js

/**
 * Track a custom event with Pirsch analytics
 * @param {string} name - The name of the event to track
 * @param {number} duration - Optional duration of the event in seconds
 * @param {object} meta - Optional metadata for the event
 * @returns {Promise<void>}
 */
export async function trackEvent(name, duration = 0, meta = {}) {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
    return;
  }

  try {
    await fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        duration,
        meta,
      }),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}
