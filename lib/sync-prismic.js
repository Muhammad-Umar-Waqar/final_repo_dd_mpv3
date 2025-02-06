import { createClient } from './prismic.js';
import { connectToDatabase } from './mongodb.js';

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

export async function syncAllContent() {
  console.log('Starting Prismic content sync...');
  const { db } = await connectToDatabase();
  const client = createClient();

  try {
    // Get all document types from Prismic
    console.log('Fetching repository information...');
    const repository = await client.getRepository();
    const types = repository.types;
    console.log(`Found ${Object.keys(types).length} document types`);

    // Sync documents of each type
    for (const type of Object.keys(types)) {
      console.log(`\nSyncing documents of type: ${type}`);
      const documents = await client.getAllByType(type);
      console.log(`Found ${documents.length} documents of type ${type}`);
      
      for (const doc of documents) {
        await syncDocument(db, doc);

        // Sync alternate language versions
        if (doc.alternate_languages?.length > 0) {
          console.log(`Syncing ${doc.alternate_languages.length} alternate language versions for ${doc.uid || doc.id}`);
          for (const altLang of doc.alternate_languages) {
            const altDoc = await client.getByID(altLang.id);
            if (altDoc) {
              await syncDocument(db, altDoc);
            }
          }
        }
      }
    }

    console.log('\n✅ All content synced successfully');
    return true;
  } catch (error) {
    console.error('\n❌ Error syncing content:', error);
    throw error;
  }
}

// CLI command to run sync
if (process.argv[1] === new URL(import.meta.url).pathname) {
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
}