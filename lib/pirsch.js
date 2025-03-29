// lib/pirsch.js
import https from 'https';

// Cache the access token to avoid requesting it for every hit
let accessToken = null;
let tokenExpiry = null;

// Get an access token using client credentials
async function getAccessToken() {
  // If we have a valid token, return it
  if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
    return accessToken;
  }

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

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          accessToken = parsedData.access_token;
          
          // Set token expiry (typically 24 hours)
          const expiresIn = parsedData.expires_in || 86400;
          tokenExpiry = new Date(Date.now() + expiresIn * 1000);
          
          resolve(accessToken);
        } catch (error) {
          console.error('Error parsing token response:', error);
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
    const token = await getAccessToken();
    if (!token) {
      console.error('Failed to get access token for Pirsch');
      return;
    }

    const url = req.url || req.nextUrl.pathname;
    const referrer = req.headers.get('referer') || '';
    const userAgent = req.headers.get('user-agent') || '';
    const ip = req.headers.get('x-forwarded-for') || '';
    const language = req.headers.get('accept-language') || '';

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
async function trackEvent(name, duration = 0, meta = {}) {
  try {
    const token = await getAccessToken();
    if (!token) {
      console.error('Failed to get access token for Pirsch');
      return;
    }

    const data = JSON.stringify({
      name: name,
      duration: duration,
      meta: meta
    });

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

    const eventReq = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 400) {
          console.error('Error tracking event:', responseData);
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
  trackPageView,
  trackEvent
};
