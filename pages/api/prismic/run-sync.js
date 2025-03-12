import { syncAllContent } from '../../../lib/sync-prismic';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await syncAllContent();
    res.status(200).json({ message: 'Sync completed successfully' });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ message: 'Sync failed', error: error.message });
  }
}
