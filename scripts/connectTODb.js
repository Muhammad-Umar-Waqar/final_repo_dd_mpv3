import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
dotenv.config({path : ".env.local"});


let cached = { conn: null, promise: null };

export async function connectToDatabase() {
  if (typeof window !== 'undefined') {
    throw new Error('MongoDB cannot be accessed on the client side.');
  }

  if (process.env.NODE_ENV === 'development') {
    if (!global.mongo) {
      global.mongo = { conn: null, promise: null };
      console.log('[DEBUG] Global mongo object created.');
    }
    cached = global.mongo;
  }

  if (cached.conn) {
    console.log('[DEBUG] Returning cached connection.');
    return cached.conn;
  }

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI;
    const MONGODB_DB = process.env.MONGODB_DB;
    console.log('[DEBUG] Creating new connection promise.');
    cached.promise = MongoClient.connect(MONGODB_URI).then((client) => {
      console.log('[DEBUG] Successfully connected to MongoDB.');
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = cached.promise;
  console.log('[DEBUG] Returning new connection.');
  return cached.conn;
}

// Helper function to convert Date objects to ISO strings
function serializeDocument(doc) {
  if (!doc) return doc;
  const serialized = { ...doc };

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
  console.log('[DEBUG] Querying document:', { type, uid, lang });

  let doc = await db.collection('prismic_content').findOne({ type, uid, lang });
  if (!doc && lang.includes('-')) {
    const genericLang = lang.split('-')[0];
    console.log('[DEBUG] Trying generic language:', genericLang);
    doc = await db.collection('prismic_content').findOne({
      type,
      uid,
      lang: new RegExp(`^${genericLang}`, 'i'),
    });
  }

  if (doc) {
    console.log('[DEBUG] Document found with structure:', {
      uid: doc.uid,
      type: doc.type,
      lang: doc.lang,
      hasBody: !!doc.data?.body,
      hasContent: !!doc.data?.content,
      bodySlices: doc.data?.body?.map(slice => slice.slice_type),
    });
  } else {
    console.log('[DEBUG] No document found.');
  }
  return serializeDocument(doc);
}

// ... (Other functions remain unchanged)
// At the bottom of your file:
(async () => {
    try {
      const connection = await connectToDatabase();
      console.log('MongoDB connection established:', connection);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    } finally {
      process.exit(0);
    }
  })();
  