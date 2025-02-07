import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslations } from '../utils/i18n';
import { getDocumentByUID, getAllDocuments } from '../lib/mongodb';

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
        <title>{post.data.title?.[0]?.text || 'Blog Post'}</title>
        <meta name="description" content={post.data.description || ''} />
      </Head>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">
          {post.data.title?.[0]?.text || 'Blog Post'}
        </h1>
        
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
          
          {Array.isArray(post.data.content) && post.data.content.map((block, index) => {
            const textContent = block?.[0]?.text || block?.text || '';
            
            if (block.type === 'paragraph') {
              return <p key={index}>{textContent}</p>;
            }
            if (block.type === 'heading1') {
              return <h1 key={index} className="text-3xl font-bold my-4">{textContent}</h1>;
            }
            if (block.type === 'heading2') {
              return <h2 key={index} className="text-2xl font-bold my-3">{textContent}</h2>;
            }
            if (block.type === 'heading3') {
              return <h3 key={index} className="text-xl font-bold my-2">{textContent}</h3>;
            }
            return null;
          })}
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
    
    // Create paths for both /[uid] and /blog/[uid]
    const localePaths = posts.map((post) => [
      {
        params: { uid: post.uid },
        locale,
      },
      {
        params: { uid: `blog/${post.uid}` },
        locale,
      }
    ]).flat();
    
    paths.push(...localePaths);
  }

  return {
    paths,
    fallback: true, // Enable fallback for new posts
  };
}

export async function getStaticProps({ params, locale }) {
  try {
    // Remove 'blog/' prefix if present
    const uid = params.uid.replace('blog/', '');
    
    // Use Next.js locale directly since it matches Prismic locale
    const prismicLocale = locale;
    
    // Try to find the document as a blog post
    let post = await getDocumentByUID('blog_post', uid, prismicLocale);

    // If not found, try the other locale
    if (!post) {
      const otherLocale = locale === 'es-es' ? 'en-us' : 'es-es';
      post = await getDocumentByUID('blog_post', uid, otherLocale);
    }

    // If still not found, return 404
    if (!post) {
      return { notFound: true };
    }

    return {
      props: {
        post,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return {
      notFound: true,
    };
  }
}
