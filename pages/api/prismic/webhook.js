import { createClient } from '../../../lib/prismic';
import { connectToDatabase } from '../../../lib/mongodb';

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
}

async function syncAlternateLanguages(db, client, doc) {
  if (!doc.alternate_languages?.length) return;

  for (const altLang of doc.alternate_languages) {
    try {
      // First get the document by ID since alternate versions may have different UIDs
      const altDoc = await client.getByID(altLang.id, { lang: '*' });

      if (altDoc) {
        await syncDocument(db, altDoc);
      }
    } catch (error) {
      console.error(`Error syncing alternate language version ${altLang.id} (${altLang.lang}):`, error.message);
    }
  }
}

async function deleteDocument(db, documentId) {
  const collection = db.collection('prismic_content');
  await collection.deleteOne({ prismicId: documentId });
}

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  console.log('req.body.type', req.body.type);
  // Get the secret from headers or body
  const secret =
    req.headers['prismic-webhook-secret'] ||
    req.headers['x-prismic-secret'] ||
    req.body?.secret;

  if (secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
    return res.status(401).json({ message: 'Invalid webhook secret' });
  }

  try {
    const { db } = await connectToDatabase();
    const client = createClient();

    // If it's a test trigger, 
    // 
    // respond successfully

    if (req.body.type === 'test-trigger') {
      return res.status(200).json({ message: 'Test trigger received successfully' });
    }

    // Process documents from the payload
    const documents = req.body.documents || [];
    console.log("Docs:>", documents)
    // Check if it's an API update
    if (req.body.type === 'api-update') {

      for (const documentId of documents) {
        try {
          // Try to get the document from Prismic
          const doc = await client.getByID(documentId, { lang: '*' });
          console.log("Doc:>", doc);
          if (doc) {
            // If the document exists, sync it
            await syncDocument(db, doc);
            await syncAlternateLanguages(db, client, doc);
          } else {
            // If the document doesn't exist in Prismic, delete it from MongoDB
            await deleteDocument(db, documentId);
          }
        } catch (error) {
          // If there's an error getting the document, assume it was deleted
          if (error.message.includes('404') ||   error.message.includes('No documents were returned')) {
            await deleteDocument(db, documentId);
          } else {
            console.error(`Error processing document ${documentId}:`, error);
          }
        }
      }
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Error processing webhook', error: error.message });
  }
}
