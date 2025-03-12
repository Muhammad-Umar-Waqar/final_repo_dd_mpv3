import { getDocumentByUID } from '../../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const { uid } = req.query;
    // Ensure language is either en-us or es-es, defaulting to en-us
    const locale = req.query.locale === 'es-es' ? 'es-es' : 'en-us';
    
    // First get the blog post
    const post = await getDocumentByUID('blog_post', uid, locale);
    
    // Then get the author document
    let authorDoc = null;
    if (post?.data?.author?.uid) {
      authorDoc = await getDocumentByUID('author', post.data.author.uid, locale);
    }

    // Get default author as well
    const defaultAuthor = await getDocumentByUID('author', 'dediabetes', locale);

    res.status(200).json({
      post: {
        uid: post?.uid,
        type: post?.type,
        authorUid: post?.data?.author?.uid,
        authorSlug: post?.data?.author?.slug,
      },
      authorDocument: authorDoc,
      defaultAuthorDocument: defaultAuthor,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
