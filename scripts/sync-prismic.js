import { MongoClient } from 'mongodb';
import * as prismic from '@prismicio/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;
const PRISMIC_REPOSITORY_NAME = process.env.PRISMIC_REPOSITORY_NAME;
const PRISMIC_ACCESS_TOKEN = process.env.PRISMIC_ACCESS_TOKEN;

if (!MONGODB_URI || !MONGODB_DB) {
  throw new Error('Please define the MONGODB_URI and MONGODB_DB environment variables');
}

if (!PRISMIC_REPOSITORY_NAME || !PRISMIC_ACCESS_TOKEN) {
  throw new Error('Please define the PRISMIC_REPOSITORY_NAME and PRISMIC_ACCESS_TOKEN environment variables');
}

// Create Prismic client
function createClient() {
  return prismic.createClient(PRISMIC_REPOSITORY_NAME, {
    accessToken: PRISMIC_ACCESS_TOKEN,
  });
}

// Connect to MongoDB
async function connectToDatabase() {
  console.log('Connecting to MongoDB...');
  console.log('URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Log URI with hidden credentials
  
  const client = await MongoClient.connect(MONGODB_URI);
  console.log('Connected to MongoDB successfully');
  return {
    client,
    db: client.db(MONGODB_DB),
  };
}

async function syncDocument(db, prismicDoc) {
  const collection = db.collection('prismic_content');
  
  const mongoDoc = {
    _id: `${prismicDoc.type}_${prismicDoc.id}`,
    prismicId: prismicDoc.id,
    type: prismicDoc.type,
    uid: prismicDoc.uid,
    lang: prismicDoc.lang,
    tags: prismicDoc.tags,
    first_publication_date: prismicDoc.first_publication_date,
    last_publication_date: prismicDoc.last_publication_date,
    data: prismicDoc.data,
    alternate_languages: prismicDoc.alternate_languages,
    synced_at: new Date(),
  };

  await collection.updateOne(
    { _id: mongoDoc._id },
    { $set: mongoDoc },
    { upsert: true }
  );

  console.log(`✓ Synced ${prismicDoc.type} document: ${prismicDoc.uid || prismicDoc.id} (${prismicDoc.lang})`);
}

async function syncAlternateLanguages(db, prismicClient, doc) {
  if (!doc.alternate_languages?.length) return;

  console.log(`Syncing ${doc.alternate_languages.length} alternate language versions for ${doc.uid || doc.id}`);
  
  for (const altLang of doc.alternate_languages) {
    try {
      console.log(`  Fetching alternate language version: ${altLang.uid} (${altLang.lang})`);
      // Use getByUID instead of getByID, and specify the language
      const altDoc = await prismicClient.getByUID(
        doc.type,
        altLang.uid,
        { lang: altLang.lang }
      );
      
      if (!altDoc) {
        console.warn(`  ⚠️ Warning: Alternate language document not found for ${doc.uid} in ${altLang.lang}`);
        continue;
      }

      await syncDocument(db, altDoc);
    } catch (error) {
      if (error.name === 'NotFoundError') {
        console.warn(`  ⚠️ Warning: Alternate language document not found for ${doc.uid} in ${altLang.lang}`);
        continue;
      }
      // For other errors, we want to log but continue syncing other documents
      console.error(`  ❌ Error syncing alternate language version for ${doc.uid} in ${altLang.lang}:`, error.message);
    }
  }
}

async function syncAllContent() {
  console.log('Starting Prismic content sync...');
  let client;
  try {
    const { db, client: mongoClient } = await connectToDatabase();
    client = mongoClient;
    const prismicClient = createClient();

    // Get all document types from Prismic
    console.log('Fetching repository information...');
    const repository = await prismicClient.getRepository();
    const types = repository.types;
    console.log(`Found ${Object.keys(types).length} document types`);

    // Sync documents of each type in both languages
    for (const type of Object.keys(types)) {
      console.log(`\nSyncing documents of type: ${type}`);
      
      // Get documents in master language (en-us)
      const enDocuments = await prismicClient.getAllByType(type, { lang: 'en-us' });
      console.log(`Found ${enDocuments.length} documents in en-us`);
      
      // Get documents in Spanish (es-es)
      const esDocuments = await prismicClient.getAllByType(type, { lang: 'es-es' });
      console.log(`Found ${esDocuments.length} documents in es-es`);
      
      // Keep track of synced document IDs to avoid duplicates
      const syncedIds = new Set();
      
      // Sync en-us documents and their alternates
      for (const doc of enDocuments) {
        if (!syncedIds.has(doc.id)) {
          await syncDocument(db, doc);
          await syncAlternateLanguages(db, prismicClient, doc);
          syncedIds.add(doc.id);
        }
      }
      
      // Sync es-es only documents (those without en-us versions)
      for (const doc of esDocuments) {
        if (!syncedIds.has(doc.id)) {
          await syncDocument(db, doc);
          syncedIds.add(doc.id);
        }
      }
    }

    // Create indexes
    console.log('\nCreating MongoDB indexes...');
    await db.collection('prismic_content').createIndex({
      'data.title': 'text',
      'data.description': 'text',
      'data.content': 'text',
    });
    await db.collection('prismic_content').createIndex({ type: 1, uid: 1, lang: 1 });
    console.log('✓ Indexes created successfully');

    console.log('\n✅ All content synced successfully');
  } catch (error) {
    console.error('\n❌ Error syncing content:', error);
    throw error;
  } finally {
    if (client) {
      console.log('Closing MongoDB connection...');
      await client.close();
    }
  }
}

// Run sync
console.log('🚀 Starting content sync process...\n');
syncAllContent()
  .then(() => {
    console.log('\nSync completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nSync failed:', error);
    process.exit(1);
  });
