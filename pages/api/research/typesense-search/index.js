// // pages/api/research/typesense-search.js
// import Typesense from 'typesense';

// const client = new Typesense.Client({
//   nodes: [
//     {
//       host: "search.dediabetes.com", // your Typesense host
//       port: 443,
//       protocol: 'https'
//     }
//   ],
//   // Use the read key for search operations
//   apiKey: "Hmbay8NzkIM9CYfi7CoaFLoe5QuP2QiqUuGwdbHhqAeTc9zJ",
//   connectionTimeoutSeconds: 5,
// });

// // Map short domain labels to full domain names for filtering
// const domainMap = {
//   behavioral: 'Behavioral Intervention',
//   complications: 'Diabetes Complications',
//   digital: 'Digital Health',
//   pharmacology: 'Pharmacological Treatments',
//   prevention: 'Diabetes Prevention',
//   supplements: 'Supplements and Vitamins',
//   t1d: 'T1D Cure Research',
// };

// export default async function handler(req, res) {
//   try {
//     const {
//       q = '',
//       page = 1,
//       limit = 6,
//       domains, // may be a single string or an array
//     } = req.query;

//     // Build filter_by string based on provided domains
//     let filterBy = '';
//     if (domains) {
//       const domainArray = Array.isArray(domains) ? domains : [domains];
//       const mappedDomains = domainArray.map((d) => domainMap[d] || d);
//       filterBy = mappedDomains.map((val) => `domain:="${val}"`).join(' || ');
//     }

//     // Construct search parameters
//     const searchParams = {
//       q,
//       query_by: 'title', // adjust fields based on your schema
//       page: Number(page),
//       per_page: Number(limit),
//     };

//     if (filterBy) {
//       searchParams.filter_by = filterBy;
//     }

//     // Use the provided collection name: 'dediabetes2'
//     const searchResults = await client
//       .collections('pages_v1_1670381409728')
//       .documents()
//       .search(searchParams);

//     // Format the response for the frontend
//     const data = {
//       results: searchResults.hits.map((hit) => hit.document),
//       total: searchResults.found,
//       page: searchResults.page,
//       totalPages: Math.ceil(searchResults.found / Number(limit)),
//     };
//     console.log("datas:", data);
    

//     return res.status(200).json(data);
//   } catch (error) {
//     console.error('Typesense search error:', error);
//     return res.status(500).json({ error: 'Search request failed' });
//   }
// }













// pages/api/research/typesense-search.js
import Typesense from 'typesense';

// Initialize the client using the read key
const client = new Typesense.Client({
  nodes: [
    {
      host: "search.dediabetes.com", // "search.dediabetes.com"
      port: 443,
      protocol: 'https'
    }
  ],
  apiKey: "Hmbay8NzkIM9CYfi7CoaFLoe5QuP2QiqUuGwdbHhqAeTc9zJ", // read-only key for searching
  connectionTimeoutSeconds: 5
});

// Map short domain keys to actual stored values, if needed.
const domainMap = {
  behavioral: "Behavioral",
  complications: "Diabetes Complications",
  digital: "Digital Health",
  pharmacology: "Pharmacological Treatments",
  prevention: "Diabetes Prevention",
  supplements: "Supplements and Vitamins",
  t1d: "T1D Cure Research"
};

export default async function handler(req, res) {
  try {
    const {
      q = '',
      page = 1,
      limit = 6,
      lang = 'en-us',
      domains,
      outcomes,
      interventions,
      participants,
      trialType,
      trialSize,
      trialDuration,
      geography,
      year,
      sponsorship
    } = req.query;

    // Helper to convert values to arrays
    const toArray = (val) => {
      if (!val) return [];
      return Array.isArray(val) ? val : [val];
    };

    // Build filters based on provided parameters:
    let filters = [];
    
    // Language filter
    filters.push(`lang:="${lang}"`);

    // Domain filter
    const domainArr = toArray(domains).map(d => domainMap[d] || d);
    if (domainArr.length) {
      const domainFilter = domainArr.map(d => `domain:="${d}"`).join(' || ');
      filters.push(`(${domainFilter})`);
    }

    // Outcomes
    const outcomesArr = toArray(outcomes);
    if (outcomesArr.length) {
      const outcomesFilter = outcomesArr.map(o => `outcomes:="${o}"`).join(' && ');
      filters.push(`(${outcomesFilter})`);
    }

    // Interventions
    const interventionsArr = toArray(interventions);
    if (interventionsArr.length) {
      const intFilter = interventionsArr.map(i => `interventions:="${i}"`).join(' && ');
      filters.push(`(${intFilter})`);
    }

    // Participants
    const participantsArr = toArray(participants);
    if (participantsArr.length) {
      const partFilter = participantsArr.map(p => `participants:="${p}"`).join(' && ');
      filters.push(`(${partFilter})`);
    }

    // Trial Type, Size, Duration (if provided)
    if (trialType) filters.push(`trialType:="${trialType}"`);
    if (trialSize) filters.push(`trialSize:="${trialSize}"`);
    if (trialDuration) filters.push(`trialDuration:="${trialDuration}"`);

    // Geography filter
    const geographyArr = toArray(geography);
    if (geographyArr.length) {
      const geoFilter = geographyArr.map(g => `geography:="${g}"`).join(' && ');
      filters.push(`(${geoFilter})`);
    }

    // Year and sponsorship filters
    if (year) filters.push(`year:=${year}`);
    if (sponsorship !== undefined) {
      if (sponsorship === 'true') filters.push(`sponsorship:=true`);
      else if (sponsorship === 'false') filters.push(`sponsorship:=false`);
    }

    const filter_by = filters.length ? filters.join(' && ') : '';

    const searchParams = {
      q,
      query_by: 'title,description,body',
      page: Number(page),
      per_page: Number(limit)
    };

    if (filter_by) searchParams.filter_by = filter_by;

    const searchResults = await client
      .collections('dediabetes2')
      .documents()
      .search(searchParams);

    const data = {
      results: searchResults.hits.map(hit => hit.document),
      total: searchResults.found,
      page: searchResults.page,
      totalPages: Math.ceil(searchResults.found / Number(limit))
    };
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
console.log("Test search results:", searchResults.hits);
    res.status(200).json(data);
  } catch (error) {
    console.error("Typesense search error:", error);
    res.status(500).json({ error: "Search request failed" });
  }
}
