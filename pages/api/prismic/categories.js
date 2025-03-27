import { createClient } from "../../../lib/prismic";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const client = createClient();
    // Query all documents of type "category"
    const categories = await client.getAllByType('catego', { lang: 'en-us' });
    // Format the categories as needed (adjust field names based on your Prismic schema)
    const formatted = categories.map(cat => ({
      id: cat.uid,
      label: cat.data.title ? cat.data.title[0].text : cat.uid
    }));
    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: error.message });
  }
}
