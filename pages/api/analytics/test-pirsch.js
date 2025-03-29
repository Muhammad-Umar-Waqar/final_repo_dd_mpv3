// pages/api/analytics/test-pirsch.js
import { getAccessToken, trackPageView, trackEvent } from '../../../lib/pirsch';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Step 1: Test authentication by getting an access token
    let token;
    try {
      token = await getAccessToken();
      console.log('Authentication successful, token received:', token ? 'Token received' : 'No token received');
    } catch (error) {
      console.error('Authentication failed:', error);
      return res.status(500).json({ 
        error: 'Authentication failed', 
        details: error.message,
        step: 'authentication'
      });
    }

    if (!token) {
      return res.status(500).json({ 
        error: 'No token received from Pirsch API', 
        step: 'authentication'
      });
    }

    // Step 2: Test page view tracking
    try {
      // Create a mock request object similar to what middleware receives
      const mockReq = {
        url: '/test-page',
        headers: new Headers({
          'user-agent': req.headers['user-agent'] || 'Test User Agent',
          'referer': req.headers['referer'] || 'https://test-referrer.com',
          'x-forwarded-for': req.headers['x-forwarded-for'] || '127.0.0.1',
          'accept-language': req.headers['accept-language'] || 'en-US'
        }),
        get: function(name) {
          return this.headers.get(name);
        }
      };
      
      await trackPageView(mockReq);
      console.log('Page view tracking test successful');
    } catch (error) {
      console.error('Page view tracking failed:', error);
      return res.status(500).json({ 
        error: 'Page view tracking failed', 
        details: error.message,
        step: 'pageView'
      });
    }

    // Step 3: Test event tracking
    try {
      // Pass the request object to trackEvent so it can extract URL and IP
      await trackEvent('test_event', 0, { test: 'data' }, req);
      console.log('Event tracking test successful');
    } catch (error) {
      console.error('Event tracking failed:', error);
      return res.status(500).json({ 
        error: 'Event tracking failed', 
        details: error.message,
        step: 'event'
      });
    }

    // All tests passed
    return res.status(200).json({ 
      success: true, 
      message: 'Pirsch integration tests passed successfully',
      env: process.env.NODE_ENV,
      clientIdExists: !!process.env.PIRSCH_CLIENT_ID,
      clientSecretExists: !!process.env.PIRSCH_CLIENT_SECRET
    });
  } catch (error) {
    console.error('Pirsch test failed:', error);
    return res.status(500).json({ 
      error: 'Pirsch test failed', 
      details: error.message 
    });
  }
}
