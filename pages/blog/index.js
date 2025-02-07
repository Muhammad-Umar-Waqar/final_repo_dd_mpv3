import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslations } from '../../utils/i18n';
import { getAllDocuments } from '../../lib/mongodb';

export default function BlogIndex({ posts }) {
  const { t, locale } = useTranslations();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{t('blog.title')}</title>
        <meta name="description" content={t('blog.description')} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{t('blog.title')}</h1>

        <div className="grid gap-8">
          {posts.map((post) => (
            <article key={post._id} className="border-b pb-8">
              <Link href={`/${post.uid}`} locale={locale}>
                <a className="block group">
                  <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-600">
                    {post.data.title?.[0]?.text || post.data.title || ''}
                  </h2>
                  
                  {post.data.description && (
                    <p className="text-gray-600 mb-4">
                      {post.data.description?.[0]?.text || post.data.description || ''}
                    </p>
                  )}
                  
                  <div className="text-sm text-gray-500">
                    <time dateTime={post.first_publication_date}>
                      {new Date(post.first_publication_date).toLocaleDateString(locale)}
                    </time>
                  </div>
                </a>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  try {
    // Map Next.js locale to Prismic locale
    const prismicLocale = locale === 'es' ? 'es-es' : 'en-us';
    const posts = await getAllDocuments('blog_post', prismicLocale);

    return {
      props: {
        posts,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
