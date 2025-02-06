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

export default async function handler(req, res) {
  // Verify webhook secret
  const secret = req.headers['prismic-webhook-secret'];
  if (secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
    return res.status(401).json({ message: 'Invalid webhook secret' });
  }

  try {
    const { db } = await connectToDatabase();
    const client = createClient();

    // Get the document that was updated
    const { type, id, secret: docSecret } = req.body;
    
    // Fetch the full document from Prismic
    const doc = await client.getByID(id);
    if (!doc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Sync the document to MongoDB
    await syncDocument(db, doc);

    // If this is a multi-language document, sync all language versions
    if (doc.alternate_languages?.length > 0) {
      for (const altLang of doc.alternate_languages) {
        const altDoc = await client.getByID(altLang.id);
        if (altDoc) {
          await syncDocument(db, altDoc);
        }
      }
    }

    res.status(200).json({ message: 'Content synced successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Error processing webhook', error: error.message });
  }
}