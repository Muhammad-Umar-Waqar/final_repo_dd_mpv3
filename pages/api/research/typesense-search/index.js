import { authOptions } from '../../auth/[...nextauth]';
import { Client } from 'typesense';
import dotenv from 'dotenv';
dotenv.config({ path: ".env.local" });
import { getServerSession } from 'next-auth/next';

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
      host: process.env.TYPESENSE_HOST, 
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


  // Validate session using getServerSession.
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
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
    // if (domains) {
    //   const arr = parseArrayParam(domains).map(val =>
    //     domainMapping[val.toLowerCase()] || val
    //   );
    //   console.log("DomainArr:", arr);
    //   filters.push(`domains:=[${quoteValues(arr)}]`);
    // }

    if (domains) {
      const arr = parseArrayParam(domains).map(val => {
        // Only apply the mapping if type equals 'research'
        if (type === 'research') {
          return domainMapping[val.toLowerCase()] || val;
        }
        // For articles (blog_post), return the domain as is
        return val;
      });
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
