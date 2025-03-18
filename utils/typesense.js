// utils/typesense.js
import { Client } from 'typesense';

// Typesense client configuration
export const typesenseClient = new Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST,
      port: process.env.TYPESENSE_PORT,
      protocol: process.env.TYPESENSE_PROTOCOL || 'https',
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 2,
});

// Create a search client adapter for InstantSearch
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

export const typesenseAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.TYPESENSE_SEARCH_API_KEY,
    nodes: [
      {
        host: process.env.TYPESENSE_HOST,
        port: process.env.TYPESENSE_PORT,
        protocol: process.env.TYPESENSE_PROTOCOL || 'https',
      },
    ],
  },
  additionalSearchParameters: {
    query_by: 'title,description,category',
  },
});

export const searchClient = typesenseAdapter.searchClient;