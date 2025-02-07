import { getAllDocuments, connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  try {
    console.log('Debug API: Starting database query...');
    
    // First, let's check what documents exist in the collection
    const { db } = await connectToDatabase();
    
    // Get all blog posts regardless of language
    const allBlogPosts = await db.collection('prismic_content')
      .find({ type: 'blog_post' })
      .toArray();
    
    console.log('Found blog posts:', allBlogPosts.map(post => ({
      uid: post.uid,
      lang: post.lang,
      title: post.data?.title
    })));

    // Now try to get posts by language
    const [enPosts, esPosts] = await Promise.all([
      db.collection('prismic_content')
        .find({ type: 'blog_post', lang: 'en-us' })
        .toArray(),
      db.collection('prismic_content')
        .find({ type: 'blog_post', lang: 'es-es' })
        .toArray()
    ]);

    console.log('English posts found:', enPosts.length);
    console.log('Spanish posts found:', esPosts.length);

    const result = {
      english: enPosts.map(post => ({
        uid: post.uid,
        type: post.type,
        lang: post.lang,
        title: post.data?.title
      })),
      spanish: esPosts.map(post => ({
        uid: post.uid,
        type: post.type,
        lang: post.lang,
        title: post.data?.title
      }))
    };
    
    // Log the results to the server console
    console.log('Debug API Results:', JSON.stringify(result, null, 2));
    
    res.status(200).json({
      ...result,
      allBlogPosts: allBlogPosts.map(post => ({
        uid: post.uid,
        type: post.type,
        lang: post.lang,
        title: post.data?.title
      }))
    });
  } catch (error) {
    console.error('Debug API detailed error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      error: error.message,
      stack: error.stack 
    });
  }
}
