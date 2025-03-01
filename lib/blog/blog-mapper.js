import { processContent } from '../content-parser';

export function mapBlogData(post, { authorName, authorImage, locale }) {
  return {
    title: post.data.title[0]?.text || '',
    publishDate: new Date(post.data.release_date || post.first_publication_date).toLocaleDateString(locale),
    publisher: post.data.author?.slug || "Dediabetes",
    author: authorName || "Dediabetes Team",
    authorImage,
    readTime: "5 min read",
    imageUrl: post.data.featured_image?.url || null,
    categories: post.data.categories?.map(cat => cat.category?.uid) || [],
    relatedPosts: (post.data.related_articles_group || []).map(related => ({
      title: related.article?.data?.title?.[0]?.text || '',
      date: new Date(related.article?.first_publication_date).toLocaleDateString(locale),
      description: '',
      slug: related.article?.uid || ''
    })),
    body: post.data.body || [],
    content: (() => {
      const parts = [];

      // Add description if exists
      if (post.data.description?.length) {
        parts.push(processContent(post.data.description));
      }

      // Add subtitle if exists
      if (post.data.subtitle?.length) {
        parts.push(processContent(post.data.subtitle));
      }

      // Process main content
      if (post.data.body) {
        post.data.body.forEach(slice => {
          if (slice.slice_type === 'text' && Array.isArray(slice.primary?.text)) {
            parts.push(processContent(slice.primary.text));
          }
        });
      }

      return parts.join('\n\n');
    })()
  };
} 