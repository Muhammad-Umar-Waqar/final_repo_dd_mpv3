// import { searchResearch } from '../../../db/search';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const {
//       q = '',              // search term
//       lang = 'en-us',      // language
//       page = 1,           // current page
//       limit = 10,         // results per page
//       outcomes,           // outcomes filter
//       interventions,      // interventions filter
//       trialType,         // trial type
//       trialSize,         // trial size
//       trialDuration,     // trial duration
//       geography,         // geography
//       year,              // publication year
//       sponsorship,       // sponsorship
//       domains            // domains
//     } = req.query;

//     // Convert parameters from string to array when needed
//     const parseArrayParam = (param) => {
//       if (!param) return [];
//       return Array.isArray(param) ? param : [param];
//     };

//     // Convert specific parameters
//     const parsedYear = year ? parseInt(year) : undefined;
//     const parsedSponsorship = sponsorship === 'true' ? true : sponsorship === 'false' ? false : undefined;

//     const results = await searchResearch({
//       searchTerm: q,
//       lang,
//       skip: (parseInt(page) - 1) * parseInt(limit),
//       limit: parseInt(limit),
//       outcomes: parseArrayParam(outcomes),
//       interventions: parseArrayParam(interventions),
//       trialType: parseArrayParam(trialType),
//       trialSize: parseArrayParam(trialSize),
//       trialDuration: parseArrayParam(trialDuration),
//       geography: parseArrayParam(geography),
//       year: parsedYear,
//       sponsorship: parsedSponsorship,
//       domains: parseArrayParam(domains)
//     });

//     res.status(200).json(results);
//   } catch (error) {
//     console.error('Error in research search:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// } 












// // pages/api/research/search.js

// import { Client } from 'typesense';
// import dotenv from 'dotenv';
// dotenv.config({ path: ".env.local" });

// const typesense = new Client({
//   nodes: [
//     {
//       host: "search.dediabetes.com", // e.g. "search.dediabetes.com"
//       protocol: "https",
//       // Remove port if using HTTPS default (443)
//       // If needed, you can specify port:443, but it's often optional.
//       path: "/"
//     }
//   ],
//   apiKey: "Hmbay8NzkIM9CYfi7CoaFLoe5QuP2QiqUuGwdbHhqAeTc9zJ", // Use your search-only key here
//   connectionTimeoutSeconds: 2
// });

// console.log("TYPESENSE_API_KEY", process.env.TYPESENSE_API_KEY);
// console.log("TYPESENSE_HOST", process.env.TYPESENSE_HOST);


// // Helper to ensure parameters are arrays
// const parseArrayParam = (param) => {
//   if (!param) return [];
//   return Array.isArray(param) ? param : [param];
// };

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }
  
//   try {
//     const {
//       q = '',
//       lang = 'en-us',
//       page = 1,
//       limit = 10,
//       outcomes,
//       interventions,
//       trialType,
//       trialSize,
//       trialDuration,
//       geography,
//       year,
//       sponsorship,
//       domains
//     } = req.query;
    
//     // Build filter expressions for Typesense.
//     // We'll enforce a filter for research documents with type:="research"
//     const filters = [];
//     filters.push(`type:="research"`);
//     if (lang) filters.push(`lang:=${lang}`);
//     if (outcomes) {
//       const arr = parseArrayParam(outcomes);
//       filters.push(`outcomes:=[${arr.join(',')}]`);
//     }
//     if (interventions) {
//       const arr = parseArrayParam(interventions);
//       filters.push(`interventions:=[${arr.join(',')}]`);
//     }
//     if (trialType) {
//       const arr = parseArrayParam(trialType);
//       filters.push(`trialType:=[${arr.join(',')}]`);
//     }
//     if (trialSize) {
//       const arr = parseArrayParam(trialSize);
//       filters.push(`trialSize:=[${arr.join(',')}]`);
//     }
//     if (trialDuration) {
//       const arr = parseArrayParam(trialDuration);
//       filters.push(`trialDuration:=[${arr.join(',')}]`);
//     }
//     if (geography) {
//       const arr = parseArrayParam(geography);
//       filters.push(`geography:=[${arr.join(',')}]`);
//     }
//     if (domains) {
//       const arr = parseArrayParam(domains);
//       filters.push(`domains:=[${arr.join(',')}]`);
//     }
//     if (year) {
//       filters.push(`year:=${year}`);
//     }
//     if (sponsorship !== undefined) {
//       // sponsorship is a string field in our schema
//       filters.push(`sponsorship:=${sponsorship}`);
//     }
    
//     const filterBy = filters.join(" && ");
    
//     const searchParameters = {
//       q,  
//       query_by: "title,description", // adjust fields if needed
//       page: Number(page),
//       per_page: Number(limit),
//       filter_by: filterBy || undefined,
//       sort_by: "publishDate:desc" // optional: sort by publishDate descending
//     };
    
//     const searchResult = await typesense
//       .collections("dediabetes4")
//       .documents()
//       .search(searchParameters);
    
//     // Format response to match your frontend expectations
//     const formatted = {
//       results: searchResult.hits.map(hit => hit.document),
//       total: searchResult.found,
//       page: searchResult.page,
//       totalPages: Math.ceil(searchResult.found / limit)
//     };
    
//     res.status(200).json(formatted);
//   } catch (error) {
//     console.error("TypeSense research search error:", error);
//     res.status(500).json({ error: "TypeSense research search error" });
//   }
// }




















// pages/api/research/search.js


// import { Client } from 'typesense';
// import dotenv from 'dotenv';


// dotenv.config({ path: ".env.local" });
// // Mapping for domain filters (from shorthand to full value)
// const domainMapping = {
//   pharmacology: "Pharmacological Treatments",
//   behavioral: "Behavioral",
//   complications: "Diabetes Complications",
//   digital: "Digital",
//   prevention: "Diabetes Prevention",
//   supplements: "Supplements",
//   t1d: "T1D"
// };

// const typesense = new Client({
//   nodes: [
//     {
//       host: process.env.TYPESENSE_HOST, // e.g. "search.dediabetes.com"
//       protocol: "https",
//       path: "/"
//     }
//   ],
//   apiKey: process.env.TYPESENSE_API_KEY, // Use your search-only key here
//   connectionTimeoutSeconds: 2
// });

// console.log("TYPESENSE_API_KEY:", process.env.TYPESENSE_API_KEY)
// console.log("TYPESENSE_HOST:", process.env.TYPESENSE_HOST)
// // Helper to ensure parameters are arrays
// const parseArrayParam = (param) => {
//   if (!param) return [];
//   return Array.isArray(param) ? param : [param];
// };

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }
  
//   try {
//     const {
//       q = '',
//       lang = 'en-us',
//       page = 1,
//       limit = 10,
//       outcomes,
//       interventions,
//       trialType,
//       trialSize,
//       trialDuration,
//       geography,
//       year,
//       sponsorship,
//       domains
//     } = req.query;
    
//     // Build filter expressions for Typesense.
//     // Enforce a filter for research documents with type:="research"
//     const filters = [];
//     filters.push(`type:="research"`);
//     if (lang) filters.push(`lang:=${lang}`);
//     if (outcomes) {
//       const arr = parseArrayParam(outcomes);
//       filters.push(`outcomes:=[${arr.join(',')}]`);
//     }
//     if (interventions) {
//       const arr = parseArrayParam(interventions);
//       filters.push(`interventions:=[${arr.join(',')}]`);
//     }
//     if (trialType) {
//       const arr = parseArrayParam(trialType);
//       filters.push(`trialType:=[${arr.join(',')}]`);
//     }
//     if (trialSize) {
//       const arr = parseArrayParam(trialSize);
//       filters.push(`trialSize:=[${arr.join(',')}]`);
//     }
//     if (trialDuration) {
//       const arr = parseArrayParam(trialDuration);
//       filters.push(`trialDuration:=[${arr.join(',')}]`);
//     }
//     if (geography) {
//       const arr = parseArrayParam(geography);
//       filters.push(`geography:=[${arr.join(',')}]`);
//     }
//     if (domains) {
//       const arr = parseArrayParam(domains).map(val =>
//         domainMapping[val.toLowerCase()] || val
//       );
//       console.log("DomainArr:", arr)
//       filters.push(`domains:=[${arr.join(',')}]`);
//     }
//     if (year) {
//       filters.push(`year:=${year}`);
//     }
//     if (sponsorship !== undefined) {
//       // sponsorship is a string field in our schema
//       filters.push(`sponsorship:=${sponsorship}`);
//     }
    
//     const filterBy = filters.join(" && ");
    
//     const searchParameters = {
//       q,  
//       query_by: "title,description",
//       page: Number(page),
//       per_page: Number(limit),
//       filter_by: filterBy || undefined,
//       sort_by: "publishDate:desc" // optional: sort by publishDate descending
//     };
    
//     const searchResult = await typesense
//       .collections("dediabetes4")
//       .documents()
//       .search(searchParameters);
    
//     // Format response to match your frontend expectations
//     const formatted = {
//       results: searchResult.hits.map(hit => hit.document),
//       total: searchResult.found,
//       page: searchResult.page,
//       totalPages: Math.ceil(searchResult.found / limit)
//     };
    
//     res.status(200).json(formatted);
//   } catch (error) {
//     console.error("TypeSense research search error:", error);
//     res.status(500).json({ error: "TypeSense research search error" });
//   }
// }
















//currentSS
// import { Client } from 'typesense';
// import dotenv from 'dotenv';
// dotenv.config({ path: ".env.local" });

// // Mapping for domain filters (from shorthand to full value)
// const domainMapping = {
//   pharmacology: "Pharmacological Treatments",
//   behavioral: "Behavioral",
//   complications: "Diabetes Complications",
//   digital: "Digital",
//   prevention: "Diabetes Prevention",
//   supplements: "Supplements",
//   t1d: "T1D"
// };

// const typesense = new Client({
//   nodes: [
//     {
//       host: process.env.TYPESENSE_HOST, // e.g. "search.dediabetes.com"
//       protocol: "https",
//       path: "/"
//     }
//   ],
//   apiKey: process.env.TYPESENSE_API_KEY, // Use your search-only key here
//   connectionTimeoutSeconds: 5
// });

// // Helper to ensure parameters are arrays
// const parseArrayParam = (param) => {
//   if (!param) return [];
//   return Array.isArray(param) ? param : [param];
// };

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }
  
//   try {
//     const {
//       q = '',
//       lang = 'en-us',
//       page = 1,
//       limit = 10,
//       outcomes,
//       interventions,
//       trialType,
//       trialSize,
//       trialDuration,
//       geography,
//       year,
//       sponsorship,
//       domains
//     } = req.query;
    
//     // Build filter expressions for Typesense.
//     // Enforce a filter for research documents with type:="research"
//     const filters = [];
//     filters.push(`type:="research"`);
//     if (lang) filters.push(`lang:=${lang}`);
//     if (outcomes) {
//       const arr = parseArrayParam(outcomes);
//       filters.push(`outcomes:=[${arr.join(',')}]`);
//     }
//     if (interventions) {
//       const arr = parseArrayParam(interventions);
//       filters.push(`interventions:=[${arr.join(',')}]`);
//     }
//     if (trialType) {
//       const arr = parseArrayParam(trialType);
//       filters.push(`trialType:=[${arr.join(',')}]`);
//     }
//     if (trialSize) {
//       const arr = parseArrayParam(trialSize);
//       filters.push(`trialSize:=[${arr.join(',')}]`);
//     }
//     if (trialDuration) {
//       const arr = parseArrayParam(trialDuration);
//       filters.push(`trialDuration:=[${arr.join(',')}]`);
//     }
//     if (geography) {
//       const arr = parseArrayParam(geography);
//       filters.push(`geography:=[${arr.join(',')}]`);
//     }
//     if (domains) {
//       const arr = parseArrayParam(domains).map(val =>
//         domainMapping[val.toLowerCase()] || val
//       );
//       console.log("DomainArr:", arr)
//       filters.push(`domains:=[${arr.join(',')}]`);
//     }
//     if (year) {
//       filters.push(`year:=${year}`);
//     }
//     if (sponsorship !== undefined) {
//       // sponsorship is a string field in our schema
//       filters.push(`sponsorship:=${sponsorship}`);
//     }
    
//     const filterBy = filters.join(" && ");
    
//     const searchParameters = {
//       q,  
//       query_by: "title,description",
//       page: Number(page),
//       per_page: Number(limit),
//       filter_by: filterBy || undefined,
//       sort_by: "publishDate:desc" // optional: sort by publishDate descending
//     };
    
//     const searchResult = await typesense
//       .collections("dediabetes4")
//       .documents()
//       .search(searchParameters);
    
//     // Format response to match your frontend expectations
//     const formatted = {
//       results: searchResult.hits.map(hit => hit.document),
//       total: searchResult.found,
//       page: searchResult.page,
//       totalPages: Math.ceil(searchResult.found / limit)
//     };
    
//     res.status(200).json(formatted);
//   } catch (error) {
//     console.error("TypeSense research search error:", error);
//     res.status(500).json({ error: "TypeSense research search error" });
//   }
// }



// Working Code:

// import { Client } from 'typesense';
// import dotenv from 'dotenv';
// dotenv.config({ path: ".env.local" });

// // Mapping for domain filters (from shorthand to full value)
// const domainMapping = {
//   pharmacology: "Pharmacological Treatments",
//   behavioral: "Behavioral",
//   complications: "Diabetes Complications",
//   digital: "Digital",
//   prevention: "Diabetes Prevention",
//   supplements: "Supplements",
//   t1d: "T1D"
// };

// const typesense = new Client({
//   nodes: [
//     {
//       host: process.env.TYPESENSE_HOST, // e.g. "search.dediabetes.com"
//       protocol: "https",
//       path: "/"
//     }
//   ],
//   apiKey: process.env.TYPESENSE_API_KEY, // Use your search-only key here
//   connectionTimeoutSeconds: 5
// });

// // Helper to ensure parameters are arrays
// const parseArrayParam = (param) => {
//   if (!param) return [];
//   return Array.isArray(param) ? param : [param];
// };

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }
  
//   try {
//     const {
//       q = '',
//       lang = 'en-us',
//       page = 1,
//       limit = 10,
//       outcomes,
//       interventions,
//       trialType,
//       trialSize,
//       trialDuration,
//       geography,
//       year,
//       sponsorship,
//       domains,
//       type = "research"
//     } = req.query;
    
//     // Build filter expressions for Typesense.
//     // Enforce a filter for research documents with type:="research"
 

//     const filters = [];
//     filters.push(`type:=${type}`);
//     if (lang) filters.push(`lang:=${lang}`);
//     if (outcomes) {
//       const arr = parseArrayParam(outcomes);
//       filters.push(`outcomes:=[${arr.join(',')}]`);
//     }
//     if (interventions) {
//       const arr = parseArrayParam(interventions);
//       filters.push(`interventions:=[${arr.join(',')}]`);
//     }
//     if (trialType) {
//       const arr = parseArrayParam(trialType);
//       filters.push(`trialType:=[${arr.join(',')}]`);
//     }
//     if (trialSize) {
//       const arr = parseArrayParam(trialSize);
//       filters.push(`trialSize:=[${arr.join(',')}]`);
//     }
//     if (trialDuration) {
//       const arr = parseArrayParam(trialDuration);
//       filters.push(`trialDuration:=[${arr.join(',')}]`);
//     }
//     if (geography) {
//       const arr = parseArrayParam(geography);
//       filters.push(`geography:=[${arr.join(',')}]`);
//     }
//     if (domains) {
//       const arr = parseArrayParam(domains).map(val =>
//         domainMapping[val.toLowerCase()] || val
//       );
//       console.log("DomainArr:", arr)
//       filters.push(`domains:=[${arr.join(',')}]`);
//     }
//     if (year) {
//       filters.push(`year:=${year}`);
//     }
//     if (sponsorship !== undefined) {
//       // sponsorship is a string field in our schema
//       filters.push(`sponsorship:=${sponsorship}`);
//     }
    
//     const filterBy = filters.join(" && ");
    
//     const searchParameters = {
//       q,  
//       query_by: "title,description",
//       page: Number(page),
//       per_page: Number(limit),
//       filter_by: filterBy || undefined,
//       sort_by: "publishDate:desc" // optional: sort by publishDate descending
//     };
    
//     const searchResult = await typesense
//       .collections("dediabetes4")
//       .documents()
//       .search(searchParameters);
    
//     // Format response to match your frontend expectations
//     const formatted = {
//       results: searchResult.hits.map(hit => hit.document),
//       total: searchResult.found,
//       page: searchResult.page,
//       totalPages: Math.ceil(searchResult.found / limit)
//     };
    
//     res.status(200).json(formatted);
//   } catch (error) {
//     console.error("TypeSense research search error:", error);
//     res.status(500).json({ error: "TypeSense research search error" });
//   }
// }


















// import { Client } from 'typesense';
// import dotenv from 'dotenv';
// dotenv.config({ path: ".env.local" });

// // Mapping for domain filters (from shorthand to full value)
// const domainMapping = {
//   pharmacology: "Pharmacological Treatments",
//   behavioral: "Behavioral",
//   complications: "Diabetes Complications",
//   digital: "Digital",
//   prevention: "Diabetes Prevention",
//   supplements: "Supplements",
//   t1d: "T1D"
// };

// const typesense = new Client({
//   nodes: [
//     {
//       host: process.env.TYPESENSE_HOST, // e.g. "search.dediabetes.com"
//       protocol: "https",
//       path: "/"
//     }
//   ],
//   apiKey: process.env.TYPESENSE_API_KEY, // Use your search-only key here
//   connectionTimeoutSeconds: 5
// });

// // Helper to ensure parameters are arrays
// const parseArrayParam = (param) => {
//   if (!param) return [];
//   return Array.isArray(param) ? param : [param];
// };

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }
  
//   try {
//     const {
//       q = '',
//       lang = 'en-us',
//       page = 1,
//       limit = 10,
//       outcomes,
//       interventions,
//       studyType,     // Updated field
//       size,          // Updated field
//       duration,      // Updated field
//       region,        // Updated field
//       year,
//       sponsorship,
//       bias_overall,
//       domains,
//       age,           // New field
//       sex,           // New field
//       other,         // New field
//       industrySponsored, // New field (boolean expected as string "true" or "false")
//       type = "research"
//     } = req.query;
    
//     // Build filter expressions for Typesense.
//     const filters = [];
//     filters.push(`type:=${type}`);
//     if (lang) filters.push(`lang:=${lang}`);
//     if (outcomes) {
//       const arr = parseArrayParam(outcomes);
//       filters.push(`outcomes:=[${arr.join(',')}]`);
//     }
//     if (interventions) {
//       const arr = parseArrayParam(interventions);
//       filters.push(`interventions:=[${arr.join(',')}]`);
//     }
//     if (studyType) {
//       const arr = parseArrayParam(studyType);
//       filters.push(`studyType:=[${arr.join(',')}]`);
//     }
//     if (size) {
//       const arr = parseArrayParam(size);
//       filters.push(`size:=[${arr.join(',')}]`);
//     }
//     if (duration) {
//       const arr = parseArrayParam(duration);
//       filters.push(`duration:=[${arr.join(',')}]`);
//     }
//     if (region) {
//       const arr = parseArrayParam(region);
//       filters.push(`region:=[${arr.join(',')}]`);
//     }
//     if (domains) {
//       const arr = parseArrayParam(domains).map(val =>
//         domainMapping[val.toLowerCase()] || val
//       );
//       console.log("DomainArr:", arr);
//       filters.push(`domains:=[${arr.join(',')}]`);
//     }
//     if (year) {
//       filters.push(`year:=${year}`);
//     }
//     if (bias_overall) {
//       filters.push(`bias_overall:=${bias_overall}`);
//     }
//     if (sponsorship !== undefined) {
//       filters.push(`sponsorship:=${sponsorship}`);
//     }
//     if (age) {
//       const arr = parseArrayParam(age);
//       filters.push(`age:=[${arr.join(',')}]`);
//     }
//     if (sex) {
//       const arr = parseArrayParam(sex);
//       filters.push(`sex:=[${arr.join(',')}]`);
//     }
//     if (other) {
//       const arr = parseArrayParam(other);
//       filters.push(`other:=[${arr.join(',')}]`);
//     }
//     if (industrySponsored !== undefined) {
//       filters.push(`industrySponsored:=${industrySponsored}`);
//     }
    
//     const filterBy = filters.join(" && ");
    
//     const searchParameters = {
//       q,  
//       query_by: "title,description",
//       page: Number(page),
//       per_page: Number(limit),
//       filter_by: filterBy || undefined,
//       sort_by: "publishDate:desc" // sort by publishDate descending
//     };
    
//     const searchResult = await typesense
//       .collections("dediabetes6")
//       .documents()
//       .search(searchParameters);

//       console.log("SEARCH-API", searchResult.hits)
    
//     // Format response to match your frontend expectations
//     const formatted = {
//       results: searchResult.hits.map(hit => hit.document),
//       total: searchResult.found,
//       page: searchResult.page,
//       totalPages: Math.ceil(searchResult.found / limit)
//     };
    
//     res.status(200).json(formatted);
//   } catch (error) {
//     console.error("TypeSense research search error:", error);
//     res.status(500).json({ error: "TypeSense research search error" });
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
    if (year) {
      filters.push(`year:=${year}`);
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
      .collections("dediabetes6")
      .documents()
      .search(searchParameters);

    console.log("SEARCH-API", searchResult.hits.map((n)=> console.log("studyType:", n.document)));
    
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
