import { connectToDatabase } from '../lib/mongodb';


// Helper function to convert Date objects to ISO strings
function serializeDocument(doc) {
    if (!doc) return doc;
  
    const serialized = { ...doc };
  
    // Convert known date fields
    if (serialized.first_publication_date instanceof Date) {
      serialized.first_publication_date = serialized.first_publication_date.toISOString();
    }
    if (serialized.last_publication_date instanceof Date) {
      serialized.last_publication_date = serialized.last_publication_date.toISOString();
    }
    if (serialized.synced_at instanceof Date) {
      serialized.synced_at = serialized.synced_at.toISOString();
    }
  
    return serialized;
  }
  
  // Helper function to format research document
  function formatResearchDoc(doc) {
    return {
      type: 'research',
      uid: doc.uid,
      category: doc.data?.domain_group?.[0]?.domain_text?.[0]?.text || 'Research',
      title: doc.data?.title?.[0]?.text || 'Untitled Research',
      description: doc.data?.tldr?.[0]?.text || doc.data?.key_findings?.[0]?.text || '',
      publisher: doc.data?.publisher?.[0]?.text || 'Unknown Publisher',
      publishDate: doc.data?.publication_year?.toString() || '',
      timeToRead: 5,
      featuredImage: doc.data?.screenshot_study_header?.url || null
    };
  }
  
  // Helper function to format blog post document
  function formatBlogPost(doc) {
    return {
      type: 'blog_post',
      uid: doc.uid,
      category: doc.data?.categories?.[0]?.category?.uid || 'Blog',
      title: doc.data?.title?.[0]?.text || 'Untitled Post',
      description: doc.data?.description?.[0]?.text || '',
      publisher: doc.data?.author?.uid || 'Unknown Author',
      publishDate: doc.data?.release_date || doc.first_publication_date?.split('T')[0] || '',
      timeToRead: 5,
      featuredImage: doc.data?.featured_image?.url || null
    };
  }
  
  // Search function for both research and blog posts
  export async function searchAll(options = {}) {
    const { db } = await connectToDatabase();
    const {
      searchTerm = '',
      lang = 'en-us',
      limit = 10,
      skip = 0,
      outcomes = [],
      interventions = [],
      trialType = [],
      trialSize = [],
      trialDuration = [],
      geography = [],
      year,
      sponsorship,
      domains = []
    } = options;
  
    // Base query for both types
    const baseQuery = {
      lang,
      $or: [{ type: 'research' }, { type: 'blog_post' }]
    };
  
    // Add title search if searchTerm exists
    if (searchTerm) {
      baseQuery['data.title.text'] = { 
        $regex: new RegExp(searchTerm, 'i') 
      };
    }
  
    // Add research-specific filters if any are present
    if (outcomes.length || interventions.length || trialType.length || 
        trialSize.length || trialDuration.length || geography.length || 
        year || sponsorship !== undefined || domains.length) {
      baseQuery.type = 'research';
      
      // Add all the research-specific filters
      if (outcomes.length > 0) baseQuery['data.body.items.outcome_text.text'] = { $in: outcomes };
      if (interventions.length > 0) baseQuery['data.body.primary.intervention_text.text'] = { $in: interventions };
      if (trialType.length > 0) baseQuery['data.study_type_group.study_type'] = { $in: trialType };
      if (trialSize.length > 0) baseQuery['data.size_group.study_size'] = { $in: trialSize };
      if (trialDuration.length > 0) baseQuery['data.duration_group.study_duration'] = { $in: trialDuration };
      if (geography.length > 0) baseQuery['data.region_group.region'] = { $in: geography };
      if (year) baseQuery['data.publication_year'] = year;
      if (sponsorship !== undefined) baseQuery['data.industry_sponsored'] = sponsorship;
      if (domains.length > 0) baseQuery['data.domain_group.domain_text.text'] = { $in: domains };
    }
  
    const sort = { first_publication_date: -1 };
    
    const results = await db.collection('prismic_content')
      .find(baseQuery)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
  
    const total = await db.collection('prismic_content').countDocuments(baseQuery);
  
    const formattedResults = results.map(doc => 
      doc.type === 'research' ? formatResearchDoc(doc) : formatBlogPost(doc)
    );
  
    return {
      results: formattedResults,
      total,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(total / limit)
    };
  }
  
  // Search function for research only
  export async function searchResearch(options = {}) {
    const { db } = await connectToDatabase();
    const {
      searchTerm = '',
      lang = 'en-us',
      limit = 10,
      skip = 0,
      outcomes = [],
      interventions = [],
      trialType = [],
      trialSize = [],
      trialDuration = [],
      geography = [],
      year,
      sponsorship,
      domains = []
    } = options;
  
    const query = {
      type: 'research',
      lang
    };
  
    // Add title search if searchTerm exists
    if (searchTerm) {
      query['data.title.text'] = { 
        $regex: new RegExp(searchTerm, 'i') 
      };
    }
  
    // Add research-specific filters
    if (outcomes.length > 0) query['data.body.items.outcome_text.text'] = { $in: outcomes };
    if (interventions.length > 0) query['data.body.primary.intervention_text.text'] = { $in: interventions };
    if (trialType.length > 0) query['data.study_type_group.study_type'] = { $in: trialType };
    if (trialSize.length > 0) query['data.size_group.study_size'] = { $in: trialSize };
    if (trialDuration.length > 0) query['data.duration_group.study_duration'] = { $in: trialDuration };
    if (geography.length > 0) query['data.region_group.region'] = { $in: geography };
    if (year) query['data.publication_year'] = year;
    if (sponsorship !== undefined) query['data.industry_sponsored'] = sponsorship;
    if (domains.length > 0) query['data.domain_group.domain_text.text'] = { $in: domains };
  
    const sort = { first_publication_date: -1 };
    
    const results = await db.collection('prismic_content')
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
  
    const total = await db.collection('prismic_content').countDocuments(query);
  
    return {
      results: results.map(formatResearchDoc),
      total,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(total / limit)
    };
  }
  
  // Search function for blog posts only
  export async function searchBlogPosts(options = {}) {
    const { db } = await connectToDatabase();
    const {
      searchTerm = '',
      lang = 'en-us',
      limit = 10,
      skip = 0
    } = options;
  
    const query = {
      type: 'blog_post',
      lang
    };
  
    // Add title search if searchTerm exists
    if (searchTerm) {
      query['data.title.text'] = { 
        $regex: new RegExp(searchTerm, 'i') 
      };
    }
  
    const sort = { first_publication_date: -1 };
    
    const results = await db.collection('prismic_content')
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
  
    const total = await db.collection('prismic_content').countDocuments(query);
  
    return {
      results: results.map(formatBlogPost),
      total,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(total / limit)
    };
  }