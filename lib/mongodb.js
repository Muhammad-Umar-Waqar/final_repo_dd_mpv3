import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in your environment files (.env.local or .env)');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable in your environment files (.env.local or .env)');
}

console.log('MONGODB_URI:', MONGODB_URI);
console.log('MONGODB_DB:', MONGODB_DB);

let cached = global.mongo;
if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (typeof window !== 'undefined') {
    throw new Error('MongoDB cannot be accessed on the client side.');
  }
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(MONGODB_URI).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

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

// Content fetching functions
export async function getDocumentByUID(type, uid, lang = 'en-us') {
  const { db } = await connectToDatabase();
  const doc = await db.collection('prismic_content').findOne({
    type,
    uid,
    lang,
  });
  return serializeDocument(doc);
}

export async function getAllDocuments(type, lang = 'en-us') {
  const { db } = await connectToDatabase();
  console.log('getAllDocuments query:', { type, lang });
  
  // First check what documents exist for this type
  const allOfType = await db.collection('prismic_content')
    .find({ type })
    .toArray();
  console.log(`Found ${allOfType.length} documents of type ${type}`);
  console.log('Languages available:', [...new Set(allOfType.map(doc => doc.lang))]);
  
  // Then perform the specific language query
  const results = await db.collection('prismic_content')
    .find({
      type,
      lang,
    })
    .sort({ first_publication_date: -1 })
    .toArray();
  
  console.log(`Found ${results.length} documents of type ${type} with lang ${lang}`);
  return results.map(serializeDocument);
}

export async function getDocumentsByType(type, options = {}) {
  const { db } = await connectToDatabase();
  const {
    lang = 'en-us',
    limit = 10,
    skip = 0,
    sort = { first_publication_date: -1 },
    tags = [],
  } = options;

  const query = {
    type,
    lang,
    ...(tags.length > 0 && { tags: { $in: tags } }),
  };

  const results = await db.collection('prismic_content')
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();
    
  return results.map(serializeDocument);
}

export async function searchDocuments(searchTerm, options = {}) {
  const { db } = await connectToDatabase();
  const {
    types = [],
    lang = 'en-us',
    limit = 10,
    skip = 0,
  } = options;

  const query = {
    lang,
    $text: { $search: searchTerm },
    ...(types.length > 0 && { type: { $in: types } }),
  };

  const results = await db.collection('prismic_content')
    .find(query)
    .sort({ score: { $meta: 'textScore' } })
    .skip(skip)
    .limit(limit)
    .toArray();
    
  return results.map(serializeDocument);
}

// Initialize text indexes for search
export async function initializeIndexes() {
  const { db } = await connectToDatabase();
  try {
    await db.collection('prismic_content').createIndex({
      'data.title': 'text',
      'data.description': 'text',
      'data.content': 'text',
    });
    await db.collection('prismic_content').createIndex({ type: 1, uid: 1, lang: 1 });
    console.log('Indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
    throw error;
  }
}
