// lib/analytics.js

/**
 * Track a custom event with Pirsch analytics
 * @param {string} name - The name of the event to track
 * @param {number} duration - Optional duration of the event in seconds
 * @param {object} meta - Optional metadata for the event
 * @returns {Promise<void>}
 */
export async function trackEvent(name, duration = 0, meta = {}) {
  if (typeof window === 'undefined' || (process.env.NODE_ENV !== 'production' && !window.location.search.includes('test=true'))) {
    return;
  }

  try {
    // Include the current URL in the request
    const url = window.location.pathname;
    
    console.log(`Tracking event "${name}" on page "${url}"`);
    
    await fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        duration,
        meta,
        url, // Include the URL in the request
      }),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}
