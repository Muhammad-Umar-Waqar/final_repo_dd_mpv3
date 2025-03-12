import { searchBlogPosts } from '../../../db/search';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      q = '',              // search term
      lang = 'en-us',      // language
      page = 1,            // current page
      limit = 10,          // results per page
      domains             // category/domain filter
    } = req.query;

    // Convert domains parameter to array
    const parseArrayParam = (param) => {
      if (!param) return [];
      return Array.isArray(param) ? param : [param];
    };

    const results = await searchBlogPosts({
      searchTerm: q,
      lang,
      skip: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
      domains: parseArrayParam(domains)
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Error in blog search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
