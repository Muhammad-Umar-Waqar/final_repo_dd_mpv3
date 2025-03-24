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
// import Typesense from 'typesense';

// // Initialize the client using the read key
// const client = new Typesense.Client({
//   nodes: [
//     {
//       host: "search.dediabetes.com", // "search.dediabetes.com"
//       port: 443,
//       protocol: 'https'
//     }
//   ],
//   apiKey: "Hmbay8NzkIM9CYfi7CoaFLoe5QuP2QiqUuGwdbHhqAeTc9zJ", // read-only key for searching
//   connectionTimeoutSeconds: 5
// });

// // Map short domain keys to actual stored values, if needed.
// const domainMap = {
//   behavioral: "Behavioral",
//   complications: "Diabetes Complications",
//   digital: "Digital Health",
//   pharmacology: "Pharmacological Treatments",
//   prevention: "Diabetes Prevention",
//   supplements: "Supplements and Vitamins",
//   t1d: "T1D Cure Research"
// };

// export default async function handler(req, res) {
//   try {
//     const {
//       q = '',
//       page = 1,
//       limit = 6,
//       lang = 'en-us',
//       domains,
//       outcomes,
//       interventions,
//       participants,
//       trialType,
//       trialSize,
//       trialDuration,
//       geography,
//       year,
//       sponsorship
//     } = req.query;

//     // Helper to convert values to arrays
//     const toArray = (val) => {
//       if (!val) return [];
//       return Array.isArray(val) ? val : [val];
//     };

//     // Build filters based on provided parameters:
//     let filters = [];
    
//     // Language filter
//     filters.push(`lang:="${lang}"`);

//     // Domain filter
//     const domainArr = toArray(domains).map(d => domainMap[d] || d);
//     if (domainArr.length) {
//       const domainFilter = domainArr.map(d => `domain:="${d}"`).join(' || ');
//       filters.push(`(${domainFilter})`);
//     }

//     // Outcomes
//     const outcomesArr = toArray(outcomes);
//     if (outcomesArr.length) {
//       const outcomesFilter = outcomesArr.map(o => `outcomes:="${o}"`).join(' && ');
//       filters.push(`(${outcomesFilter})`);
//     }

//     // Interventions
//     const interventionsArr = toArray(interventions);
//     if (interventionsArr.length) {
//       const intFilter = interventionsArr.map(i => `interventions:="${i}"`).join(' && ');
//       filters.push(`(${intFilter})`);
//     }

//     // Participants
//     const participantsArr = toArray(participants);
//     if (participantsArr.length) {
//       const partFilter = participantsArr.map(p => `participants:="${p}"`).join(' && ');
//       filters.push(`(${partFilter})`);
//     }

//     // Trial Type, Size, Duration (if provided)
//     if (trialType) filters.push(`trialType:="${trialType}"`);
//     if (trialSize) filters.push(`trialSize:="${trialSize}"`);
//     if (trialDuration) filters.push(`trialDuration:="${trialDuration}"`);

//     // Geography filter
//     const geographyArr = toArray(geography);
//     if (geographyArr.length) {
//       const geoFilter = geographyArr.map(g => `geography:="${g}"`).join(' && ');
//       filters.push(`(${geoFilter})`);
//     }

//     // Year and sponsorship filters
//     if (year) filters.push(`year:=${year}`);
//     if (sponsorship !== undefined) {
//       if (sponsorship === 'true') filters.push(`sponsorship:=true`);
//       else if (sponsorship === 'false') filters.push(`sponsorship:=false`);
//     }

//     const filter_by = filters.length ? filters.join(' && ') : '';

//     const searchParams = {
//       q,
//       query_by: 'title,description,body',
//       page: Number(page),
//       per_page: Number(limit)
//     };

//     if (filter_by) searchParams.filter_by = filter_by;

//     const searchResults = await client
//       .collections('dediabetes2')
//       .documents()
//       .search(searchParams);

//     const data = {
//       results: searchResults.hits.map(hit => hit.document),
//       total: searchResults.found,
//       page: searchResults.page,
//       totalPages: Math.ceil(searchResults.found / Number(limit))
//     };
//     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//     res.setHeader('Pragma', 'no-cache');
//     res.setHeader('Expires', '0');
// console.log("Test search results:", searchResults.hits);
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Typesense search error:", error);
//     res.status(500).json({ error: "Search request failed" });
//   }
// }











































import { Client } from 'typesense';
import dotenv from 'dotenv';
dotenv.config({ path: ".env.local" });

// Mapping for domain filters (from shorthand to full value)
const domainMapping = {
  pharmacology: "Pharmacological Treatments",
  behavioral: "Behavioral",
  complications: "Diabetes Complications",
  digital: "Digital",
  prevention: "Diabetes Prevention",
  supplements: "Supplements",
  t1d: "T1D"
};

const typesense = new Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST, // e.g. "search.dediabetes.com"
      protocol: "https",
      path: "/"
    }
  ],
  apiKey: process.env.TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 5
});

// Helper to ensure parameters are arrays
const parseArrayParam = (param) => {
  if (!param) return [];
  return Array.isArray(param) ? param : [param];
};

// Helper to wrap values in quotes for filter expressions
const quoteValues = (arr) => arr.map(val => `"${val}"`).join(',');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const {
      q = '',
      lang = 'en-us',
      page = 1,
      limit = 10,
      outcomes,
      interventions,
      studyType,
      size,
      duration,
      region,
      year,
      sponsorship,
      bias_overall,  // Note: using bias_overall key
      domains,
      age,
      sex,
      other,
      industrySponsored,
      type = "research"
    } = req.query;
    
    // Build filter expressions for Typesense.
    const filters = [];
    filters.push(`type:=${type}`);
    if (lang) filters.push(`lang:=${lang}`);
    if (outcomes) {
      const arr = parseArrayParam(outcomes);
      filters.push(`outcomes:=[${quoteValues(arr)}]`);
    }
    if (interventions) {
      const arr = parseArrayParam(interventions);
      filters.push(`interventions:=[${quoteValues(arr)}]`);
    }
    if (studyType) {
      const arr = parseArrayParam(studyType);
      filters.push(`studyType:=[${quoteValues(arr)}]`);
    }
    if (size) {
      const arr = parseArrayParam(size);
      filters.push(`size:=[${quoteValues(arr)}]`);
    }
    if (duration) {
      const arr = parseArrayParam(duration);
      filters.push(`duration:=[${quoteValues(arr)}]`);
    }
    if (region) {
      const arr = parseArrayParam(region);
      filters.push(`region:=[${quoteValues(arr)}]`);
    }
    if (domains) {
      const arr = parseArrayParam(domains).map(val =>
        domainMapping[val.toLowerCase()] || val
      );
      console.log("DomainArr:", arr);
      filters.push(`domains:=[${quoteValues(arr)}]`);
    }
    // if (year) {
    //   filters.push(`year:=${year}`);
    // }
    if (year) {
      let yearFrom, yearTo;
      let yearArray;
      if (typeof year === "string" && year.includes(",")) {
        // Split comma-separated string into an array
        yearArray = year.split(",").map(val => parseInt(val, 10));
      } else if (Array.isArray(year)) {
        yearArray = year.map(val => parseInt(val, 10));
      } else {
        yearFrom = Number(year);
        yearTo = null;
      }
      
      if (yearArray) {
        yearFrom = Math.min(...yearArray);
        yearTo = Math.max(...yearArray);
      }
      
      if (!isNaN(yearFrom) && !isNaN(yearTo) && yearTo !== null) {
        filters.push(`year:>=${yearFrom} && year:<=${yearTo}`);
      } else if (!isNaN(yearFrom)) {
        filters.push(`year:>=${yearFrom}`);
      } else if (!isNaN(yearTo)) {
        filters.push(`year:<=${yearTo}`);
      }
    }
    
    if (bias_overall) {
      filters.push(`bias_overall:=${quoteValues(parseArrayParam(bias_overall))}`);
    }
    if (sponsorship !== undefined) {
      filters.push(`sponsorship:=${sponsorship}`);
    }
    if (age) {
      const arr = parseArrayParam(age);
      filters.push(`age:=[${quoteValues(arr)}]`);
    }
    if (sex) {
      const arr = parseArrayParam(sex);
      filters.push(`sex:=[${quoteValues(arr)}]`);
    }
    if (other) {
      const arr = parseArrayParam(other);
      filters.push(`other:=[${quoteValues(arr)}]`);
    }
    if (industrySponsored !== undefined) {
      filters.push(`industrySponsored:=${industrySponsored}`);
    }
    
    const filterBy = filters.join(" && ");
    
    const searchParameters = {
      q,  
      query_by: "title,description",
      page: Number(page),
      per_page: Number(limit),
      filter_by: filterBy || undefined,
      sort_by: "publishDate:desc"
    };
    
    const searchResult = await typesense
      .collections("dediabetes7")
      .documents()
      .search(searchParameters);

      // console.log("Final filter expression:", filterBy);

    // console.log("SEARCH-API", searchResult.hits.map((n)=> console.log("studyType:", n.document)));
    
    // Format response to match your frontend expectations
    const formatted = {
      results: searchResult.hits.map(hit => hit.document),
      total: searchResult.found,
      page: searchResult.page,
      totalPages: Math.ceil(searchResult.found / limit)
    };
    
    res.status(200).json(formatted);
  } catch (error) {
    console.error("TypeSense research search error:", error);
    res.status(500).json({ error: "TypeSense research search error" });
  }
}
