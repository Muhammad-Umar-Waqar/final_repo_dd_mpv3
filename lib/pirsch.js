// lib/pirsch.js
import https from 'https';

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
  
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      client_id: process.env.PIRSCH_CLIENT_ID,
      client_secret: process.env.PIRSCH_CLIENT_SECRET
    });

    const options = {
      hostname: 'api.pirsch.io',
      port: 443,
      path: '/api/v1/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    console.log('Sending token request to:', options.hostname + options.path);

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        console.log('Token response status:', res.statusCode);
        
        try {
          const parsedData = JSON.parse(responseData);
          
          if (res.statusCode >= 400 || !parsedData.access_token) {
            console.error('Error getting token:', responseData);
            reject(new Error(`Failed to get token: ${responseData}`));
            return;
          }
          
          accessToken = parsedData.access_token;
          
          // Set token expiry (typically 24 hours)
          const expiresIn = parsedData.expires_in || 86400;
          tokenExpiry = new Date(Date.now() + expiresIn * 1000);
          
          console.log('Successfully obtained access token, expires in:', expiresIn, 'seconds');
          resolve(accessToken);
        } catch (error) {
          console.error('Error parsing token response:', error, 'Raw response:', responseData);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Error getting access token:', error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Send a page view hit to Pirsch
async function trackPageView(req) {
  try {
    console.log('Tracking page view for:', req.url || req.nextUrl?.pathname);
    
    const token = await getAccessToken();
    if (!token) {
      console.error('Failed to get access token for Pirsch');
      return;
    }

    // Handle both Next.js middleware request objects and regular request objects
    let url, referrer, userAgent, ip, language;
    
    if (req.headers instanceof Headers) {
      // Next.js middleware request object
      url = req.url || req.nextUrl?.pathname;
      referrer = req.headers.get('referer') || '';
      userAgent = req.headers.get('user-agent') || '';
      ip = req.headers.get('x-forwarded-for') || '';
      language = req.headers.get('accept-language') || '';
    } else if (typeof req.headers.get === 'function') {
      // Custom object with get method
      url = req.url;
      referrer = req.headers.get('referer') || '';
      userAgent = req.headers.get('user-agent') || '';
      ip = req.headers.get('x-forwarded-for') || '';
      language = req.headers.get('accept-language') || '';
    } else {
      // Regular Node.js request object
      url = req.url;
      referrer = req.headers.referer || req.headers.referrer || '';
      userAgent = req.headers['user-agent'] || '';
      ip = req.headers['x-forwarded-for'] || '';
      language = req.headers['accept-language'] || '';
    }

    console.log('Pirsch tracking data:', { url, referrer, userAgent: userAgent.substring(0, 20) + '...', ip, language });

    const data = JSON.stringify({
      url: url,
      referrer: referrer,
      user_agent: userAgent,
      ip: ip,
      language: language
    });

    const options = {
      hostname: 'api.pirsch.io',
      port: 443,
      path: '/api/v1/hit',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const hitReq = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 400) {
          console.error('Error tracking page view:', responseData);
        } else {
          console.log('Successfully tracked page view. Status:', res.statusCode);
        }
      });
    });

    hitReq.on('error', (error) => {
      console.error('Error sending hit to Pirsch:', error);
    });

    hitReq.write(data);
    hitReq.end();
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

    const data = JSON.stringify(eventData);

    const options = {
      hostname: 'api.pirsch.io',
      port: 443,
      path: '/api/v1/event',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    console.log('Sending event to Pirsch API:', options.path);
    console.log('Event data:', data);

    const eventReq = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 400) {
          console.error('Error tracking event:', responseData);
        } else {
          console.log('Successfully tracked event. Status:', res.statusCode);
        }
      });
    });

    eventReq.on('error', (error) => {
      console.error('Error sending event to Pirsch:', error);
    });

    eventReq.write(data);
    eventReq.end();
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

export {
  getAccessToken,
  trackPageView,
  trackEvent
};
