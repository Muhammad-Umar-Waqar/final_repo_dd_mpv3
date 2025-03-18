// typesense-schema.js

// utils/typesense-schema.js
export const researchSchema = {
    name: 'research',
    fields: [
      { name: 'uid', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'category', type: 'string', facet: true },
      { name: 'publishDate', type: 'string', facet: true },
      { name: 'publisher', type: 'string', facet: true },
      { name: 'type', type: 'string', facet: true },
      { name: 'timeToRead', type: 'int32' },
      { name: 'featuredImage', type: 'string' },
      { name: 'outcomes', type: 'string[]', facet: true, optional: true },
      { name: 'interventions', type: 'string[]', facet: true, optional: true },
      { name: 'trialType', type: 'string', facet: true, optional: true },
      { name: 'trialSize', type: 'string', facet: true, optional: true },
      { name: 'trialDuration', type: 'string', facet: true, optional: true },
      { name: 'geography', type: 'string', facet: true, optional: true },
      { name: 'domains', type: 'string[]', facet: true, optional: true },
      { name: 'sponsorship', type: 'string', facet: true, optional: true },
    ],
    default_sorting_field: 'publishDate',
  };
  
  export const blogSchema = {
    name: 'blog_posts',
    fields: [
      { name: 'uid', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'category', type: 'string', facet: true },
      { name: 'publishDate', type: 'string', facet: true },
      { name: 'publisher', type: 'string', facet: true },
      { name: 'type', type: 'string', facet: true },
      { name: 'timeToRead', type: 'int32' },
      { name: 'featuredImage', type: 'string' },
      { name: 'domains', type: 'string[]', facet: true, optional: true },
    ],
    default_sorting_field: 'publishDate',
  };