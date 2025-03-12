import { getDocumentByUID } from '../../../lib/mongodb';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { uid, locale = 'en-us' } = req.query;

  try {
    // Get post content from MongoDB
    const post = await getDocumentByUID('blog_post', uid, locale);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Get comments from MongoDB
    const { db } = await connectToDatabase();
    const comments = await db
      .collection('comments')
      .find({ postId: uid })
      .sort({ createdAt: -1 })
      .toArray();

    // Format the response
    const response = {
      post: {
        uid: post.uid,
        title: post.data.title,
        content: post.data.content,
        publishedAt: post.first_publication_date,
        lastModified: post.last_publication_date,
        data: post.data,
      },
      comments: comments.map(comment => ({
        id: comment._id,
        content: comment.content,
        author: comment.author,
        createdAt: comment.createdAt,
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Error fetching post data' });
  }
}

// Handle POST requests for comments
export async function addComment(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { uid } = req.query;
  const { content, author } = req.body;

  try {
    const { db } = await connectToDatabase();
    
    const result = await db.collection('comments').insertOne({
      postId: uid,
      content,
      author,
      createdAt: new Date(),
    });

    res.status(201).json({
      id: result.insertedId,
      content,
      author,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Error adding comment' });
  }
}
