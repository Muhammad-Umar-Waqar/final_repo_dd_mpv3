import { syncAllContent } from '../../../lib/sync-prismic';
import { initializeIndexes } from '../../../lib/mongodb';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Only allow in development mode or with proper authentication
  if (process.env.NODE_ENV !== 'development') {
    // In production, you might want to add proper authentication here
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Sync all content from Prismic to MongoDB
    await syncAllContent();
    
    // Initialize MongoDB indexes after sync
    await initializeIndexes();

    res.status(200).json({ message: 'Content synced successfully' });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ message: 'Error syncing content', error: error.message });
  }
}