// // Working Code: scripts/createCollection.js
// import Typesense from "typesense";
// import dotenv from "dotenv";
// dotenv.config({path : ".env.local"});

// const client = new Typesense.Client({
//   nodes: [
//     {
//       host: process.env.TYPESENSE_HOST, // e.g. "search.dediabetes.com"
//       port: 443,
//       protocol: "https"
//     }
//   ],
//   apiKey: process.env.TYPESENSE_API_KEY, // Use the master key for creating collections
//   connectionTimeoutSeconds: 5,
// });

// (async () => {
//   try {

//     // Check if the collection exist

//     // Define the new schema
//     const schema = {
//       name: "dediabetes4",
//       fields: [
//         { name: "id", type: "string" }, // primary key
//         { name: "uid", type: "string" },
//         { name: "type", type: "string", facet: true }, // "research" or "blog_post"
//         { name: "title", type: "string" },
//         { name: "description", type: "string" },
//         { name: "publisher", type: "string", facet: true },
//         { name: "publishDate", type: "float", facet: true },
//         { name: "timeToRead", type: "int32" },
//         { name: "lang", type: "string", facet: true },
//         { name: "featuredImage", type: "string" },
//         // Advanced research fields (empty for blog posts)
//         { name: "outcomes", type: "string[]", facet: true },
//         { name: "interventions", type: "string[]", facet: true },
//         { name: "participants", type: "string[]", facet: true }, // <-- NEW
//         { name: "trialType", type: "string[]", facet: true },
//         { name: "trialSize", type: "string[]", facet: true },
//         { name: "trialDuration", type: "string[]", facet: true },
//         { name: "geography", type: "string[]", facet: true },
//         { name: "year", type: "string", facet: true },
//         { name: "sponsorship", type: "string", facet: true },
//         { name: "domains", type: "string[]", facet: true },
//         { name: "age", type: "string[]", facet: true },
//         { name: "sex", type: "string[]", facet: true },
//         { name: "other", type: "string[]", facet: true },
//         { name: "industrySponsored", type: "bool", facet: true },

//       ],
//       default_sorting_field: "publishDate"
//     };
    
    

//     // Create the new collection
//     const newCollection = await client.collections().create(schema);
//     console.log("Collection created:", newCollection);
//   } catch (error) {
//     console.error("Error creating collection:", error);
//   }
// })();
















// dediabetes5


// scripts/createCollection.js
// import Typesense from "typesense";
// import dotenv from "dotenv";
// dotenv.config({ path: ".env.local" });

// const client = new Typesense.Client({
//   nodes: [
//     {
//       host: process.env.TYPESENSE_HOST, // e.g. "search.dediabetes.com"
//       port: 443,
//       protocol: "https"
//     }
//   ],
//   apiKey: process.env.TYPESENSE_API_KEY, // Use the master key for creating collections
//   connectionTimeoutSeconds: 5,
// });

// (async () => {
//   try {
//     // Define the updated schema with new field names and additional fields
//     const schema = {
//       name: "dediabetes5",
//       fields: [
//         { name: "id", type: "string" }, // primary key
//         { name: "uid", type: "string" },
//         { name: "type", type: "string", facet: true }, // "research" or "blog_post"
//         { name: "title", type: "string" },
//         { name: "description", type: "string" },
//         { name: "publisher", type: "string", facet: true },
//         { name: "publishDate", type: "float", facet: true },
//         { name: "timeToRead", type: "int32" },
//         { name: "lang", type: "string", facet: true },
//         { name: "featuredImage", type: "string" },
//         // Advanced research fields
//         { name: "outcomes", type: "string[]", facet: true },
//         { name: "interventions", type: "string[]", facet: true },
//         { name: "participants", type: "string[]", facet: true },
//         { name: "studyType", type: "string[]", facet: true }, // Updated from trialType
//         { name: "size", type: "string[]", facet: true },      // Updated from trialSize
//         { name: "duration", type: "string[]", facet: true },  // Updated from trialDuration
//         { name: "region", type: "string[]", facet: true },    // Updated from geography
//         { name: "year", type: "string", facet: true },        // Year field (consider number type for range queries)
//         { name: "sponsorship", type: "string", facet: true },
//         { name: "domains", type: "string[]", facet: true },
//         { name: "age", type: "string[]", facet: true },       // New: Age
//         { name: "sex", type: "string[]", facet: true },       // New: Sex
//         { name: "other", type: "string[]", facet: true },     // New: Other
//         { name: "industrySponsored", type: "bool", facet: true } // New: Industry Sponsored
//       ],
//       default_sorting_field: "publishDate"
//     };

//     // Create the new collection
//     const newCollection = await client.collections().create(schema);
//     console.log("Collection created:", newCollection);
//   } catch (error) {
//     console.error("Error creating collection:", error);
//   }
// })();

















// dediabetes6


// scripts/createCollection.js
// import Typesense from "typesense";
// import dotenv from "dotenv";
// dotenv.config({ path: ".env.local" });

// const client = new Typesense.Client({
//   nodes: [
//     {
//       host: process.env.TYPESENSE_HOST, // e.g. "search.dediabetes.com"
//       port: 443,
//       protocol: "https"
//     }
//   ],
//   apiKey: process.env.TYPESENSE_API_KEY, // Use the master key for creating collections
//   connectionTimeoutSeconds: 5,
// });

// (async () => {
//   try {
//     // Define the updated schema with new field names and additional fields
//     const schema = {
//       name: "dediabetes6",
//       fields: [
//         { name: "id", type: "string" }, // primary key
//         { name: "uid", type: "string" },
//         { name: "type", type: "string", facet: true }, // "research" or "blog_post"
//         { name: "title", type: "string" },
//         { name: "description", type: "string" },
//         { name: "publisher", type: "string", facet: true },
//         { name: "publishDate", type: "float", facet: true },
//         { name: "timeToRead", type: "int32" },
//         { name: "lang", type: "string", facet: true },
//         { name: "featuredImage", type: "string" },
//         // Advanced research fields
//         { name: "outcomes", type: "string[]", facet: true },
//         { name: "interventions", type: "string[]", facet: true },
//         { name: "participants", type: "string[]", facet: true },
//         { name: "studyType", type: "string[]", facet: true }, // Updated from trialType
//         { name: "size", type: "string[]", facet: true },      // Updated from trialSize
//         { name: "duration", type: "string[]", facet: true },  // Updated from trialDuration
//         { name: "region", type: "string[]", facet: true },    // Updated from geography
//         { name: "year", type: "string", facet: true },        // Year field (consider number type for range queries)
//         { name: "sponsorship", type: "string", facet: true },
//         { name: "bias_overall", type: "string", facet: true },
//         { name: "domains", type: "string[]", facet: true },
//         { name: "age", type: "string[]", facet: true },       // New: Age
//         { name: "sex", type: "string[]", facet: true },       // New: Sex
//         { name: "other", type: "string[]", facet: true },     // New: Other
//         { name: "industrySponsored", type: "bool", facet: true } // New: Industry Sponsored
//       ],
//       default_sorting_field: "publishDate"
//     };

//     // Create the new collection
//     const newCollection = await client.collections().create(schema);
//     console.log("Collection created:", newCollection);
//   } catch (error) {
//     console.error("Error creating collection:", error);
//   }
// })();






















// dediabetes7


// scripts/createCollection.js
import Typesense from "typesense";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST, // e.g. "search.dediabetes.com"
      port: 443,
      protocol: "https"
    }
  ],
  apiKey: process.env.TYPESENSE_API_KEY, // Use the master key for creating collections
  connectionTimeoutSeconds: 5,
});

(async () => {
  try {
    // Define the updated schema with new field names and additional fields
    const schema = {
      name: "dediabetes7",
      fields: [
        { name: "id", type: "string" }, // primary key
        { name: "uid", type: "string" },
        { name: "type", type: "string", facet: true }, // "research" or "blog_post"
        { name: "title", type: "string" },
        { name: "description", type: "string" },
        { name: "publisher", type: "string", facet: true },
        { name: "publishDate", type: "float", facet: true },
        { name: "timeToRead", type: "int32" },
        { name: "lang", type: "string", facet: true },
        { name: "featuredImage", type: "string" },
        // Advanced research fields
        { name: "outcomes", type: "string[]", facet: true },
        { name: "interventions", type: "string[]", facet: true },
        { name: "participants", type: "string[]", facet: true },
        { name: "studyType", type: "string[]", facet: true }, // Updated from trialType
        { name: "size", type: "string[]", facet: true },      // Updated from trialSize
        { name: "duration", type: "string[]", facet: true },  // Updated from trialDuration
        { name: "region", type: "string[]", facet: true },    // Updated from geography
        { name: "year", type: "int32", facet: true },
        // Year field (consider number type for range queries)
        { name: "sponsorship", type: "string", facet: true },
        { name: "bias_overall", type: "string", facet: true },
        { name: "domains", type: "string[]", facet: true },
        { name: "age", type: "string[]", facet: true },       // New: Age
        { name: "sex", type: "string[]", facet: true },       // New: Sex
        { name: "other", type: "string[]", facet: true },     // New: Other
        { name: "industrySponsored", type: "bool", facet: true } // New: Industry Sponsored
      ],
      default_sorting_field: "publishDate"
    };

    // Create the new collection
    const newCollection = await client.collections().create(schema);
    console.log("Collection created:", newCollection);
  } catch (error) {
    console.error("Error creating collection:", error);
  }
})();






















