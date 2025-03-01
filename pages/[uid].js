import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslations } from '../utils/i18n';
import { getDocumentByUID, getAllDocuments } from '../lib/mongodb';
import ResearchTemplate from '../components/ResearchTemplate';
import ResearchSEO from '../components/research/ResearchSEO';
import ResearchSkeleton from '../components/research/ResearchSkeleton';
import NotFoundState from '../components/research/NotFoundState';
import { mapResearchData } from '../lib/research/research-mapper';

export default function Page({ post, type }) {
  const router = useRouter();
  const { t, locale } = useTranslations();

  // Show loading state if page is being generated
  if (router.isFallback) {
    return <ResearchSkeleton />;
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

  // If it's a research post, transform the data and use ResearchTemplate
  if (type === 'research') {
    const research = mapResearchData(post);

    return (
      <div className="min-h-screen bg-background">
        <ResearchSEO
          title={research.title}
          description={research.summary}
          publishedAt={post.first_publication_date}
          updatedAt={post.last_publication_date}
          author={{
            name: post.data.author?.name || 'Dexdiabetes',
            uid: post.data.author?.uid || 'dediabetes'
          }}
          authorImage={post.data.author?.headshot?.url}
          featuredImage={post.data.featured_image?.url}
          domains={research.domains || []}
        />
        <ResearchTemplate {...research} />
      </div>
    );
  }

  // Regular page content
  return (
    <>
      <Head>
        <title>{post.data.title?.[0]?.text || 'Page'}</title>
        <meta name="description" content={post.data.description || ''} />
      </Head>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">
          {post.data.title?.[0]?.text || 'Page'}
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
  const paths = [];
  
  // Map URL locales to database locales
  const databaseLocales = {
    'en': 'en-us',
    'es': 'es-es'
  };
  
  for (const locale of locales) {
    const dbLocale = databaseLocales[locale] || locale;
    
    // Get all pages
    const pages = await getAllDocuments('page', dbLocale);
    const pagePaths = pages.map((page) => ({
      params: { uid: page.uid },
      locale,
    }));
    
    // Get all research posts and create paths for both root and /research/ URLs
    const researchPosts = await getAllDocuments('research', dbLocale);
    const researchPaths = researchPosts.flatMap((post) => [
      {
        params: { uid: post.uid },
        locale,
      },
      {
        params: { uid: `research/${post.uid}` },
        locale,
      }
    ]);
    
    paths.push(...pagePaths, ...researchPaths);
  }

  return {
    paths,
    fallback: true, // Enable fallback for new pages
  };
}

export async function getStaticProps({ params, locale }) {
  try {
    // Map URL locales to database locales
    const databaseLocales = {
      'en': 'en-us',
      'es': 'es-es'
    };

    const uid = params.uid;
    const dbLocale = databaseLocales[locale] || locale;
    
    // Handle research path
    const isResearchPath = params.uid.startsWith('research/');
    const cleanUid = isResearchPath ? params.uid.replace('research/', '') : params.uid;

    // Try to find the document as a research post first
    let post = await getDocumentByUID('research', cleanUid, dbLocale);
    if (post) {
      // Check if we should redirect to the alternate language version
      if (post.alternate_languages?.length > 0) {
        const currentLang = post.lang;
        const requestedLang = dbLocale;
        
        // If the post we found is not in the requested language
        if (currentLang !== requestedLang) {
          // Find the alternate version in the requested language
          const alternateVersion = post.alternate_languages.find(alt => alt.lang === requestedLang);
          if (alternateVersion) {
            // Redirect to the alternate version, maintaining the research/ prefix if present
            const redirectPath = isResearchPath ? 
              `/${locale}/research/${alternateVersion.uid}` : 
              `/${locale}/${alternateVersion.uid}`;
            
            return {
              redirect: {
                destination: redirectPath,
                permanent: false
              }
            };
          }
        }
      }

      // If found in /research/ path, redirect to root path (commented out as per existing code)
      // if (isResearchPath) {
      //   return {
      //     redirect: {
      //       destination: `/${locale}/${cleanUid}`,
      //       permanent: true,
      //     },
      //   };
      // }
      
      return {
        props: {
          post,
          type: 'research'
        },
        revalidate: 60,
      };
    }

    // If not a research post, try as a regular page
    post = await getDocumentByUID('page', uid, dbLocale);
    
    // If still not found, try the other locale
    if (!post) {
      const otherLocale = locale === 'es' ? 'en-us' : 'es-es';
      // Try research post in other locale first
      post = await getDocumentByUID('research', cleanUid, otherLocale);
      if (post) {
        // Check alternate languages for research post in other locale
        if (post.alternate_languages?.length > 0) {
          const alternateVersion = post.alternate_languages.find(alt => alt.lang === dbLocale);
          if (alternateVersion) {
            // Redirect to the alternate version, maintaining the research/ prefix if present
            const redirectPath = isResearchPath ? 
              `/${locale}/research/${alternateVersion.uid}` : 
              `/${locale}/${alternateVersion.uid}`;
            
            return {
              redirect: {
                destination: redirectPath,
                permanent: false
              }
            };
          }
        }

        return {
          props: {
            post,
            type: 'research'
          },
          revalidate: 60,
        };
      }
      
      // Then try page in other locale
      post = await getDocumentByUID('page', uid, otherLocale);
      
      // Check alternate languages for regular page
      if (post?.alternate_languages?.length > 0) {
        const alternateVersion = post.alternate_languages.find(alt => alt.lang === dbLocale);
        if (alternateVersion) {
          return {
            redirect: {
              destination: `/${locale}/${alternateVersion.uid}`,
              permanent: false
            }
          };
        }
      }
    }

    if (!post) {
      return { notFound: true };
    }

    return {
      props: {
        post,
        type: 'page'
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching page:', error);
    return {
      notFound: true,
    };
  }
}
