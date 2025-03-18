// // scripts/createCollection.js
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
//         { name: "domains", type: "string[]", facet: true }
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