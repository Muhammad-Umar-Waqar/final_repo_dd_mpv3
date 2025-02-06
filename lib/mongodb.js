import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env');
}

let cached = global.mongo;
if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Content fetching functions
export async function getDocumentByUID(type, uid, lang = 'en') {
  const { db } = await connectToDatabase();
  return await db.collection('prismic_content').findOne({
    type,
    uid,
    lang,
  });
}

export async function getAllDocuments(type, lang = 'en') {
  const { db } = await connectToDatabase();
  return await db.collection('prismic_content')
    .find({
      type,
      lang,
    })
    .sort({ first_publication_date: -1 })
    .toArray();
}

export async function getDocumentsByType(type, options = {}) {
  const { db } = await connectToDatabase();
  const {
    lang = 'en',
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

  return await db.collection('prismic_content')
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();
}

export async function searchDocuments(searchTerm, options = {}) {
  const { db } = await connectToDatabase();
  const {
    types = [],
    lang = 'en',
    limit = 10,
    skip = 0,
  } = options;

  const query = {
    lang,
    $text: { $search: searchTerm },
    ...(types.length > 0 && { type: { $in: types } }),
  };

  return await db.collection('prismic_content')
    .find(query)
    .sort({ score: { $meta: 'textScore' } })
    .skip(skip)
    .limit(limit)
    .toArray();
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