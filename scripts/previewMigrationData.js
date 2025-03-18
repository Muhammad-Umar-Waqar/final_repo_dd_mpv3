// // scripts/previewMigrationData.js
// import dotenv from "dotenv";
// import { connectToDatabase } from "../lib/mongodb.js";
// dotenv.config({path: ".env.local"});

// /**
//  * Helper to extract and join text from an array of items.
//  * Each item is expected to have a `text` property or be a plain string.
//  */
// function extractText(items) {
//   if (!Array.isArray(items)) return "";
//   return items
//     .map((item) => (typeof item === "string" ? item : item.text || ""))
//     .join(" ")
//     .trim();
// }

// /**
//  * Helper to extract an array of text values from an array of items.
//  */
// function extractTextArray(items) {
//   if (!Array.isArray(items)) return [];
//   return items
//     .map((item) => (typeof item === "string" ? item : item.text || ""))
//     .filter(Boolean);
// }

// /**
//  * Transformation function for research documents.
//  * Adjust these mappings if your actual document structure is different.
//  */
// function transformResearchDoc(doc) {
//   const data = doc.data || {};

//   // Attempt to extract category from domain_group.
//   let category = "";
//   if (Array.isArray(data.domain_group) && data.domain_group.length) {
//     category = extractText(data.domain_group);
//   }
//   if (!category) {
//     category = "Research";
//   }

//   // For body, join text from each slice in data.body if available.
//   let bodyText = "";
//   if (Array.isArray(data.body)) {
//     bodyText = data.body
//       .map((slice) => {
//         if (slice.primary && Array.isArray(slice.primary.text)) {
//           return extractText(slice.primary.text);
//         }
//         return extractText(slice);
//       })
//       .join("\n")
//       .trim();
//   }

//   return {
//     id: doc.uid || doc._id.toString(),
//     type: "research",
//     uid: doc.uid || "",
//     category:  doc.data?.domain_group?.[0]?.domain_text?.[0]?.text || 'Research',
//     title: extractText(data.title),
//     description: extractText(data.tldr),
//     body: bodyText,
//     featuredImage: data.screenshot_study_header?.url || "",
//     publishDate: data.publication_year ? data.publication_year.toString() : "",
//     publisher: Array.isArray(data.publisher) ? extractText(data.publisher) : "",
//     timeToRead: 5,
//     // Advanced filter fields:
//     domain: category,
//     outcomes: Array.isArray(data.outcomes) ? extractTextArray(data.outcomes) : [],
//     interventions: Array.isArray(data.intervention) ? extractTextArray(data.intervention) : [],
//     participants: Array.isArray(data.participants)
//       ? extractTextArray(data.participants)
//       : [
//           ...extractTextArray(data.age_group || []),
//           ...extractTextArray(data.sex_group || [])
//         ],
//     trialType: Array.isArray(data.study_type_group) ? extractText(data.study_type_group) : "",
//     trialSize: Array.isArray(data.size_group) ? extractText(data.size_group) : "",
//     trialDuration: Array.isArray(data.duration_group) ? extractText(data.duration_group) : "",
//     geography: Array.isArray(data.region_group) ? extractTextArray(data.region_group) : [],
//     year: data.publication_year ? parseInt(data.publication_year) : 2025,
//     sponsorship: !!data.industry_sponsored,
//     lang: doc.lang || "en-us",
//     page_priority_score: data.page_priority_score || 0,
//   };
// }

// /**
//  * Transformation function for blog_post documents.
//  */
// function transformBlogPostDoc(doc) {
//   const data = doc.data || {};

//   // Extract category from data.categories if available.
//   let category = "";
//   if (Array.isArray(data.categories) && data.categories.length) {
//     category = extractText(data.categories);
//   }
//   if (!category) {
//     category = "Article";
//   }

//   return {
//     id: doc.uid || doc._id.toString(),
//     type: "blog_post",
//     uid: doc.uid || "",
//     category: category,
//     title: extractText(data.title) || "",
//     description: extractText(data.description) || "",
//     body: "", // Assuming blog posts do not have an additional detailed body
//     featuredImage: data.featured_image?.url || "",
//     publishDate: data.release_date || "",
//     publisher: data.publisher ? extractText(data.publisher) : "deDiabetes",
//     timeToRead: 5,
//     // For blog posts, advanced filter fields can be left empty:
//     domain: category,
//     outcomes: [],
//     interventions: [],
//     participants: [],
//     trialType: "",
//     trialSize: "",
//     trialDuration: "",
//     geography: [],
//     year: 2025,
//     sponsorship: false,
//     lang: doc.lang || "en-us",
//     page_priority_score: 0,
//   };
// }

// /**
//  * Main transform function that selects the correct transformation based on doc.type.
//  */
// function transformDoc(doc) {
//   if (doc.type === "research") {
//     return transformResearchDoc(doc);
//   } else if (doc.type === "blog_post") {
//     return transformBlogPostDoc(doc);
//   }
//   return null;
// }

// (async () => {
//   try {
//     const { db } = await connectToDatabase();

//     // Fetch documents of types "research" and "blog_post" from prismic_content
//     const documents = await db
//       .collection("prismic_content")
//       .find({ type: { $in: ["research", "blog_post"] } })
//       .toArray();

//     console.log(`Found ${documents.length} documents to preview.`);

//     const transformedDocs = documents
//       .map(transformDoc)
//       .filter(Boolean);

//     console.log("Transformed Documents Preview:");
//     // Print the first 5 transformed documents
//     transformedDocs.slice(0, 5).forEach((doc, i) => {
//       console.log(`Document ${i + 1}:`, JSON.stringify(doc, null, 2));
//     });
//   } catch (error) {
//     console.error("Error previewing migration data:", error);
//   }
// })();
