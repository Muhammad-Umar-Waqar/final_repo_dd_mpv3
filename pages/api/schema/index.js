import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const { documentId } = req.query;

    if (documentId) {
      // Fetch specific document
      const doc = await db.collection('prismic_content').findOne(
        { _id: documentId }
      );

      if (!doc) {
        return res.status(404).json({ message: 'Document not found' });
      }

      // Extract schema for specific document
      const schema = {
        collection: 'prismic_content',
        documentId: documentId,
        fields: {},
      };

      Object.entries(doc).forEach(([field, value]) => {
        schema.fields[field] = {
          type: Array.isArray(value) ? 'array' : typeof value,
          value: value,
        };
      });

      return res.status(200).json(schema);
    } else {
      // Get list of documents with basic info
      const documents = await db.collection('prismic_content')
        .find({})
        .project({ _id: 1, type: 1, uid: 1 })
        .toArray();

      // Get collection info
      const schema = {
        collection: 'prismic_content',
        documentCount: documents.length,
        indexes: await db.collection('prismic_content').indexes(),
        documents: documents.map(doc => ({
          id: doc._id,
          type: doc.type,
          uid: doc.uid
        }))
      };

      return res.status(200).json(schema);
    }
  } catch (error) {
    console.error('Error fetching schema:');
    return res.status(500).json({ message: 'Error fetching database schema', error: error.message });
  }
}
