// lib/pirsch.js
// Using fetch API instead of https module for Edge compatibility

// Cache the access token to avoid requesting it for every hit
let accessToken = null;
let tokenExpiry = null;

// Get an access token using client credentials
async function getAccessToken() {
  // If we have a valid token, return it
  if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
    console.log('Using cached access token, valid until:', tokenExpiry);
    return accessToken;
  }

  console.log('Requesting new access token from Pirsch API');
  console.log('Client ID exists:', !!process.env.PIRSCH_CLIENT_ID);
  console.log('Client Secret exists:', !!process.env.PIRSCH_CLIENT_SECRET);
  
  try {
    const response = await fetch('https://api.pirsch.io/api/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.PIRSCH_CLIENT_ID,
        client_secret: process.env.PIRSCH_CLIENT_SECRET
      })
    });

    console.log('Token response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error getting token:', errorText);
      throw new Error(`Failed to get token: ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data.access_token) {
      console.error('No access token in response:', data);
      throw new Error('No access token in response');
    }
    
    accessToken = data.access_token;
    
    // Set token expiry (typically 24 hours)
    const expiresIn = data.expires_in || 86400;
    tokenExpiry = new Date(Date.now() + expiresIn * 1000);
    
    console.log('Successfully obtained access token, expires in:', expiresIn, 'seconds');
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

// Send a page view hit to Pirsch
async function trackPageView(req) {
  try {
    const pathname = req.url || req.nextUrl?.pathname;
    console.log('Tracking page view for:', pathname);
    
    // Skip tracking for asset requests and API routes
    const isAsset = /\.(ico|png|jpg|jpeg|gif|svg|css|js)$/i.test(pathname);
    const isApiRoute = pathname.startsWith('/api/');
    
    if (isAsset || isApiRoute) {
      console.log('Skipping tracking for asset or API route:', pathname);
      return;
    }
    
    const token = await getAccessToken();
    if (!token) {
      console.error('Failed to get access token for Pirsch');
      return;
    }

    // Handle both Next.js middleware request objects and regular request objects
    let url, referrer, userAgent, ip, language;
    
    if (req.headers instanceof Headers) {
      // Next.js middleware request object
      url = pathname;
      referrer = req.headers.get('referer') || '';
      userAgent = req.headers.get('user-agent') || '';
      ip = req.headers.get('x-forwarded-for') || '';
      language = req.headers.get('accept-language') || '';
    } else if (typeof req.headers.get === 'function') {
      // Custom object with get method
      url = pathname;
      referrer = req.headers.get('referer') || '';
      userAgent = req.headers.get('user-agent') || '';
      ip = req.headers.get('x-forwarded-for') || '';
      language = req.headers.get('accept-language') || '';
    } else {
      // Regular Node.js request object
      url = pathname;
      referrer = req.headers.referer || req.headers.referrer || '';
      userAgent = req.headers['user-agent'] || '';
      ip = req.headers['x-forwarded-for'] || '';
      language = req.headers['accept-language'] || '';
    }

    // Clean the URL to ensure it's a valid path
    // Remove query parameters and hash fragments
    url = url.split('?')[0].split('#')[0];
    
    // Skip tracking for empty or invalid URLs
    if (!url || url === '') {
      console.log('Skipping tracking for empty URL');
      return;
    }

    console.log('Pirsch tracking data:', { url, referrer, userAgent: userAgent ? userAgent.substring(0, 20) + '...' : '', ip, language });

    const trackingData = {
      url: url,
      referrer: referrer,
      user_agent: userAgent,
      ip: ip,
      language: language
    };

    const response = await fetch('https://api.pirsch.io/api/v1/hit', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackingData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error tracking page view:', errorText);
    } else {
      console.log('Successfully tracked page view. Status:', response.status);
    }
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

// Track a custom event
async function trackEvent(name, duration = 0, meta = {}, req = null) {
  try {
    console.log('Tracking event:', name, 'with duration:', duration, 'and meta:', meta);
    
    const token = await getAccessToken();
    if (!token) {
      console.error('Failed to get access token for Pirsch');
      return;
    }

    // Get URL and IP from request if available
    let url = '/';
    let ip = '127.0.0.1'; // Default IP for testing
    let userAgent = '';
    let referrer = '';
    
    if (req) {
      // Extract URL and IP from request object
      if (req.headers instanceof Headers) {
        // Next.js middleware request object
        url = req.url || req.nextUrl?.pathname || '/';
        ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
        userAgent = req.headers.get('user-agent') || '';
        referrer = req.headers.get('referer') || '';
      } else if (typeof req.headers.get === 'function') {
        // Custom object with get method
        url = req.url || '/';
        ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
        userAgent = req.headers.get('user-agent') || '';
        referrer = req.headers.get('referer') || '';
      } else {
        // Regular Node.js request object
        url = req.url || '/';
        ip = req.headers['x-forwarded-for'] || '127.0.0.1';
        userAgent = req.headers['user-agent'] || '';
        referrer = req.headers.referer || req.headers.referrer || '';
      }
    } else if (typeof window !== 'undefined') {
      // Client-side: use current URL
      url = window.location.pathname;
      // We can't get the IP client-side, so we'll use a placeholder
      ip = '127.0.0.1';
      userAgent = window.navigator.userAgent;
      referrer = document.referrer;
    }

    console.log('Event tracking data:', { url, ip, name, userAgent: userAgent ? userAgent.substring(0, 20) + '...' : '' });

    // Ensure we have the required fields according to Pirsch API
    const eventData = {
      name: name,
      url: url,
      ip: ip, // IP is required
      duration: duration
    };
    
    // Add user agent if available
    if (userAgent) {
      eventData.user_agent = userAgent;
    }
    
    // Add referrer if available
    if (referrer) {
      eventData.referrer = referrer;
    }
    
    // Add metadata if provided
    if (Object.keys(meta).length > 0) {
      eventData.meta = meta;
    }

    console.log('Sending event to Pirsch API: /api/v1/event');
    console.log('Event data:', eventData);

    const response = await fetch('https://api.pirsch.io/api/v1/event', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error tracking event:', errorText);
    } else {
      console.log('Successfully tracked event. Status:', response.status);
    }
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

export {
  getAccessToken,
  trackPageView,
  trackEvent
};
