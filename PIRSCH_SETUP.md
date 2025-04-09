# Pirsch Analytics Setup

This project uses Pirsch for privacy-friendly analytics. This document explains how the integration works and how to use it.

## Configuration

Pirsch requires the following environment variables:

- `PIRSCH_CLIENT_ID`: Your Pirsch client ID
- `PIRSCH_CLIENT_SECRET`: Your Pirsch client secret

These have been added to your `.env.local` file.

## How It Works

### Page View Tracking

Page views are automatically tracked server-side via the middleware. The tracking only happens in production mode (`process.env.NODE_ENV === 'production'`).

The middleware captures:
- URL path
- Referrer
- User agent
- IP address
- Accept-language header

### Event Tracking

To track custom events, use the `trackEvent` function from `lib/analytics.js`:

```javascript
import { trackEvent } from '../lib/analytics';

// Track a simple event
trackEvent('button_click');

// Track an event with duration
trackEvent('video_watched', 120); // 120 seconds

// Track an event with metadata
trackEvent('product_view', 0, { productId: '123', category: 'supplements' });
```

Events are only tracked in production mode.

## Implementation Details

The integration consists of the following files:

1. `lib/pirsch.js` - Server-side Pirsch client that handles authentication and API calls
2. `middleware.js` - Tracks page views for all matched routes
3. `pages/api/analytics/event.js` - API endpoint for tracking custom events
4. `lib/analytics.js` - Client-side utility for tracking events

## Viewing Analytics

Access your analytics dashboard at https://dashboard.pirsch.io/
