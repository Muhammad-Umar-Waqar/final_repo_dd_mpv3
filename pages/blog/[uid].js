import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslations } from '../../utils/i18n';
import { getDocumentByUID, getAllDocuments } from '../../lib/mongodb';

export default function BlogPost({ post }) {
  const router = useRouter();
  const { t, locale } = useTranslations();

  // Show loading state if page is being generated
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Show 404 if post not found
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Head>
        <title>{post.data.title}</title>
        <meta name="description" content={post.data.description || ''} />
      </Head>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">{post.data.title}</h1>
        
        {post.data.featured_image && (
          <div className="mb-8">
            <img 
              src={post.data.featured_image.url} 
              alt={post.data.featured_image.alt || ''} 
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        <div className="prose max-w-none">
          {/* Render your post content here based on your data structure */}
          {post.data.content}
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <time dateTime={post.first_publication_date}>
            {new Date(post.first_publication_date).toLocaleDateString(locale)}
          </time>
        </div>
      </article>
    </>
  );
}

export async function getStaticPaths({ locales }) {
  // Get all blog posts for each locale
  const paths = [];
  
  for (const locale of locales) {
    const posts = await getAllDocuments('blog_post', locale);
    const localePaths = posts.map((post) => ({
      params: { uid: post.uid },
      locale,
    }));
    paths.push(...localePaths);
  }

  return {
    paths,
    fallback: true, // Enable fallback for new posts
  };
}

export async function getStaticProps({ params, locale = 'en' }) {
  try {
    console.log('getStaticProps called with:', { params, locale });
    
    if (!params?.uid) {
      console.error('No UID provided in params');
      return { notFound: true };
    }

    console.log('Attempting to connect to database and fetch post...');
    const post = await getDocumentByUID('blog_post', params.uid, locale);
    console.log('Database query complete. Post found:', !!post);

    if (!post) {
      console.log('No post found for:', { type: 'blog_post', uid: params.uid, locale });
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Detailed error in getStaticProps:', {
      message: error.message,
      stack: error.stack,
      params,
      locale
    });
    throw error; // Let Next.js handle the error instead of returning notFound
  }
}
