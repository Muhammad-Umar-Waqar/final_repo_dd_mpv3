// scripts/createCollection.js
import Typesense from 'typesense';


const schema = {
  "name": "dediabetes2",
  "fields": [
    { "name": "id", "type": "string" },
    { "name": "title", "type": "string" },
    { "name": "abstract", "type": "string" },
    { "name": "body", "type": "string" },
    { "name": "domain", "type": "string", "facet": true },
    { "name": "researchType", "type": "string", "facet": true },
    { "name": "page_priority_score", "type": "int32" },
    { "name": "lang", "type": "string", "facet": true }
  ],
  "default_sorting_field": "page_priority_score"
};

const client = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST, // e.g. "search.dediabetes.com"
      port: 443,
      protocol: 'https'
    }
  ],
  apiKey: process.env.TYPESENSE_API_KEY, // Use the master key for creating collections
  connectionTimeoutSeconds: 5,
});

(async () => {
  try {
    const newCollection = await client.collections().create(schema);
    console.log("Collection created:", newCollection);
  } catch (error) {
    console.error("Error creating collection:", error);
  }
})();
