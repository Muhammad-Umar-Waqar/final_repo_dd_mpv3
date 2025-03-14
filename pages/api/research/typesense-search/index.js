// pages/api/research/typesense-search.js
import Typesense from 'typesense';

const client = new Typesense.Client({
  nodes: [
    {
      host: "search.dediabetes.com", // your Typesense host
      port: 443,
      protocol: 'https'
    }
  ],
  // Use the read key for search operations
  apiKey: "Hmbay8NzkIM9CYfi7CoaFLoe5QuP2QiqUuGwdbHhqAeTc9zJ",
  connectionTimeoutSeconds: 5,
});

// Map short domain labels to full domain names for filtering
const domainMap = {
  behavioral: 'Behavioral Intervention',
  complications: 'Diabetes Complications',
  digital: 'Digital Health',
  pharmacology: 'Pharmacological Treatments',
  prevention: 'Diabetes Prevention',
  supplements: 'Supplements and Vitamins',
  t1d: 'T1D Cure Research',
};

export default async function handler(req, res) {
  try {
    const {
      q = '',
      page = 1,
      limit = 6,
      domains, // may be a single string or an array
    } = req.query;

    // Build filter_by string based on provided domains
    let filterBy = '';
    if (domains) {
      const domainArray = Array.isArray(domains) ? domains : [domains];
      const mappedDomains = domainArray.map((d) => domainMap[d] || d);
      filterBy = mappedDomains.map((val) => `domain:="${val}"`).join(' || ');
    }

    // Construct search parameters
    const searchParams = {
      q,
      query_by: 'title', // adjust fields based on your schema
      page: Number(page),
      per_page: Number(limit),
    };

    if (filterBy) {
      searchParams.filter_by = filterBy;
    }

    // Use the provided collection name: 'dediabetes2'
    const searchResults = await client
      .collections('pages_v1_1670381409728')
      .documents()
      .search(searchParams);

    // Format the response for the frontend
    const data = {
      results: searchResults.hits.map((hit) => hit.document),
      total: searchResults.found,
      page: searchResults.page,
      totalPages: Math.ceil(searchResults.found / Number(limit)),
    };
    console.log("datas:", data);
    

    return res.status(200).json(data);
  } catch (error) {
    console.error('Typesense search error:', error);
    return res.status(500).json({ error: 'Search request failed' });
  }
}
