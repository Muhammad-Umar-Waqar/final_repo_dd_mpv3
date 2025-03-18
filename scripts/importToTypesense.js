
// // scripts/importUnifiedToTypesense.js
// import dotenv from "dotenv";
// import { connectToDatabase } from "../lib/mongodb.js";
// import Typesense from "typesense";

// dotenv.config({ path: ".env.local" });

// // Helper function to convert a date string to Unix timestamp (in seconds) as float
// const convertToUnix = (dateStr) => {
//   const date = new Date(dateStr);
//   return isNaN(date.getTime()) ? 0 : date.getTime() / 1000;
// };

// async function migrateData() {
//   // Connect to MongoDB – ensure connectToDatabase() returns both `db` and `client`
//   const { db, client: mongoClient } = await connectToDatabase();

//   // Fetch all documents from the prismic_content collection
//   const docs = await db.collection("prismic_content").find({}).toArray();

//   // Transform documents into Typesense format
//   const transformedDocs = docs.map((doc) => {
//     // Determine content type: research or blog_post
//     const contentType = doc.type || "research";

//     // Build category field (matches your search.js)
//     const category =
//       contentType === "research"
//         ? doc.data?.domain_group?.[0]?.domain_text?.[0]?.text || "Research"
//         : doc.data?.categories?.[0]?.category?.uid || "Blog";

//     // Advanced research fields – for blog posts, these remain empty arrays
//     const outcomes =
//       contentType === "research"
//         ? doc.data?.body?.items?.map((item) => item.outcome_text?.[0]?.text).filter(Boolean) || []
//         : [];
//     const interventions =
//       contentType === "research"
//         ? doc.data?.body?.primary?.intervention_text?.map((i) => i.text).filter(Boolean) || []
//         : [];
//     const trialType =
//       contentType === "research" && doc.data?.study_type_group?.study_type
//         ? [doc.data.study_type_group.study_type]
//         : [];
//     const trialSize =
//       contentType === "research" && doc.data?.size_group?.study_size
//         ? [doc.data.size_group.study_size]
//         : [];
//     const trialDuration =
//       contentType === "research" && doc.data?.duration_group?.study_duration
//         ? [doc.data.duration_group.study_duration]
//         : [];
//     const geography =
//       contentType === "research" && doc.data?.region_group?.region
//         ? [doc.data.region_group.region]
//         : [];
//     const year =
//       contentType === "research" && doc.data?.publication_year
//         ? doc.data.publication_year.toString()
//         : "";
//     const sponsorship =
//       contentType === "research" && doc.data?.industry_sponsored
//         ? doc.data.industry_sponsored.toString()
//         : "";
//     const domains =
//       contentType === "research"
//         ? doc.data?.domain_group?.map((d) => d.domain_text?.[0]?.text).filter(Boolean) || []
//         : doc.data?.categories?.[0]?.category?.uid
//         ? [doc.data.categories?.[0]?.category?.uid]
//         : [];

//     // --- NEW PARTICIPANTS FIELD ---
//     const participants =
//       contentType === "research"
//         ? doc.data?.body?.items?.map((item) => item.participant_text?.[0]?.text).filter(Boolean) || []
//         : [];
//     // Adjust the above path if your participant data is stored differently.

//     // Convert publishDate to Unix timestamp (in seconds)
//     let publishDate;
//     if (contentType === "research") {
//       publishDate = doc.data?.publication_year ? convertToUnix(doc.data.publication_year) : 0;
//     } else {
//       if (doc.data?.release_date) {
//         publishDate = convertToUnix(doc.data.release_date);
//       } else if (doc.first_publication_date) {
//         // Use the date part of the ISO string
//         publishDate = convertToUnix(doc.first_publication_date.split("T")[0]);
//       } else {
//         publishDate = 0;
//       }
//     }

//     return {
//       id: doc.uid, // Typesense requires an "id" field
//       uid: doc.uid,
//       type: contentType,
//       category, // New field matching search.js logic
//       title:
//         contentType === "research"
//           ? doc.data?.title?.[0]?.text || "Untitled Research"
//           : doc.data?.title?.[0]?.text || "Untitled Post",
//       description:
//         contentType === "research"
//           ? doc.data?.tldr?.[0]?.text || ""
//           : doc.data?.description?.[0]?.text || "",
//       publisher:
//         contentType === "research"
//           ? doc.data?.publisher?.[0]?.text || "Unknown Publisher"
//           : doc.data?.author?.uid || "Unknown Author",
//       publishDate, // Converted to Unix timestamp as a float
//       timeToRead: 5,
//       lang: doc.lang || "en-us",
//       featuredImage:
//         contentType === "research"
//           ? doc.data?.screenshot_study_header?.url || null
//           : doc.data?.featured_image?.url || null,
//       outcomes,
//       interventions,
//       participants,    // <-- Include participants in the final object
//       trialType,
//       trialSize,
//       trialDuration,
//       geography,
//       year,
//       sponsorship,
//       domains
//     };
//   });

//   // Initialize Typesense client using env variables
//   const typesense = new Typesense.Client({
//     nodes: [
//       {
//         host: process.env.TYPESENSE_HOST,
//         port: 443,
//         protocol: "https"
//       }
//     ],
//     apiKey: process.env.TYPESENSE_API_KEY
//   });

//   // Import documents into the "content" collection (which should match your created schema)
//   const importResponse = await typesense.collections("dediabetes4").documents().import(transformedDocs, {
//     action: "upsert"
//   });
//   console.log("Import response:", importResponse);


// }

// migrateData().catch(console.error);
