import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslations } from '../../utils/i18n';
import { getDocumentByUID, getAllDocuments } from '../../lib/mongodb';
import ArticleTemplate from '../../components/ArticleTemplate';
import NotFoundState from '../../components/research/NotFoundState';
import BlogSkeleton from '../../components/blog/BlogSkeleton';
import { mapBlogData } from '../../lib/blog/blog-mapper';
import BlogSEO from '../../components/blog/BlogSEO';

export default function BlogPost({ post, authorImage, authorName }) {
  const router = useRouter();
  const { t, locale } = useTranslations();

  console.log('BlogPost component rendered with authorImage:', authorImage);

  // Show loading state if page is being generated
  if (router.isFallback) {
    return <BlogSkeleton />;
  }

  // Show 404 if post not found
  if (!post) {
    return (
      <>
        <Head>
          <title>{t('notFound.metaTitle')}</title>
          <meta name="description" content={t('notFound.metaDescription')} />
        </Head>
        <NotFoundState />
      </>
    );
  }

  // Transform MongoDB post data to match ArticleTemplate structure
  const articleData = mapBlogData(post, { authorName, authorImage, locale });

  console.log('ArticleData being passed to ArticleTemplate:', {
    title: articleData.title,
    author: articleData.author,
    authorImage: articleData.authorImage
  });

  return (
    <div className="min-h-screen bg-background">
      <BlogSEO 
        title={articleData.title}
        description={post.data.description?.[0]?.text || ''}
        publishedAt={post.first_publication_date}
        updatedAt={post.last_publication_date}
        author={{
          name: authorName || 'Dediabetes',
          uid: post.data.author?.uid || 'dediabetes',
        }}
        authorImage={authorImage}
        featuredImage={post.data.featured_image?.url || null}
      />

      <ArticleTemplate {...articleData} />
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const paths = [];
  
  const databaseLocales = {
    'en': 'en-us',
    'es': 'es-es'
  };
  
  for (const locale of locales) {
    const dbLocale = databaseLocales[locale] || locale;
    const posts = await getAllDocuments('blog_post', dbLocale);
    const localePaths = posts.map((post) => ({
      params: { uid: post.uid },
      locale,
    }));
    paths.push(...localePaths);
  }

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params, locale }) {
  try {
    console.log('getStaticProps called with:', { params, locale });
    
    if (!params?.uid) {
      console.error('No UID provided in params');
      return { notFound: true };
    }

    const databaseLocales = {
      'en': 'en-us',
      'es': 'es-es'
    };
    const dbLocale = databaseLocales[locale] || locale;
    
    console.log('Fetching blog post...');
    let post = await getDocumentByUID('blog_post', params.uid, dbLocale);
    let authorDoc = null;
    
    // If not found in current locale, try the other locale
    if (!post) {
      console.log('Post not found in current locale, trying other locale...');
      const otherLocale = dbLocale === 'en-us' ? 'es-es' : 'en-us';
      post = await getDocumentByUID('blog_post', params.uid, otherLocale);
      
      if (!post) {
        console.log('Post not found in any locale');
        return { notFound: true };
      }
    }

    // Check if we should redirect to the alternate language version
    if (post.alternate_languages?.length > 0) {
      const currentLang = post.lang;
      const requestedLang = dbLocale;
      
      // If the post we found is not in the requested language
      if (currentLang !== requestedLang) {
        // Find the alternate version in the requested language
        const alternateVersion = post.alternate_languages.find(alt => alt.lang === requestedLang);
        if (alternateVersion) {
          // Redirect to the alternate version
          return {
            redirect: {
              destination: `/${locale}/blog/${alternateVersion.uid}`,
              permanent: false
            }
          };
        }
      }
    }

    console.log('Post author data:', post.data.author);

    // Fetch author document if author UID exists
    let authorImage = null;
    let authorName = null;
    if (post.data.author?.uid) {
      console.log('Fetching author document for UID:', post.data.author.uid);
      // Try to get author in current locale first
      authorDoc = await getDocumentByUID('author', post.data.author.uid, dbLocale);
      
      // If author not found in current locale, try other locale
      if (!authorDoc) {
        const otherLocale = dbLocale === 'en-us' ? 'es-es' : 'en-us';
        authorDoc = await getDocumentByUID('author', post.data.author.uid, otherLocale);
      }
      
      console.log('Author document:', JSON.stringify(authorDoc, null, 2));
      
      // Get author image and name if available
      if (authorDoc?.data?.headshot?.url) {
        authorImage = authorDoc.data.headshot.url;
      }
      if (authorDoc?.data?.name?.[0]?.text) {
        authorName = authorDoc.data.name[0].text;
      }
      console.log('Found author image URL:', authorImage);
      console.log('Found author name:', authorName);
    }
    
    // Use default author image if no author image found
    if (!authorImage) {
      console.log('Fetching default author (dediabetes) document');
      // Try default author in current locale first
      let defaultAuthor = await getDocumentByUID('author', 'dediabetes', dbLocale);
      
      // If not found, try other locale
      if (!defaultAuthor) {
        const otherLocale = dbLocale === 'en-us' ? 'es-es' : 'en-us';
        defaultAuthor = await getDocumentByUID('author', 'dediabetes', otherLocale);
      }
      
      console.log('Default author document:', JSON.stringify(defaultAuthor, null, 2));
      
      // Get default author image from headshot field
      if (defaultAuthor?.data?.headshot?.url) {
        authorImage = defaultAuthor.data.headshot.url;
      }
      console.log('Using default author image URL:', authorImage);
    }

    console.log('Final authorImage value:', authorImage);

    return {
      props: {
        post,
        authorImage: authorImage || null,
        authorName: authorName || null
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    throw error;
  }
}
