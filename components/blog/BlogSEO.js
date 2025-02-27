import { NextSeo, ArticleJsonLd } from 'next-seo';
import { useRouter } from 'next/router';

const BlogSEO = ({
  title,
  description,
  publishedAt,
  updatedAt,
  author,
  authorImage,
  featuredImage,
  siteConfig = {
    siteName: 'Dexdiabetes',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://dexdiabetes.com',
    twitterHandle: '@dexdiabetes',
    defaultImage: '/images/default-og.jpg',
    defaultLocale: 'es'
  }
}) => {
  const router = useRouter();
  const canonicalUrl = `${siteConfig.siteUrl}${router.asPath}`;
  const imageUrl = featuredImage ?? siteConfig.defaultImage;
  
  const ogImages = [{
    url: imageUrl,
    width: 1200,
    height: 630,
    alt: title,
  }];

  return (
    <>
      <NextSeo
        title={`${title} - ${siteConfig.siteName}`}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          locale: router.locale || siteConfig.defaultLocale,
          url: canonicalUrl,
          title,
          description,
          images: ogImages,
          site_name: siteConfig.siteName,
          article: {
            publishedTime: publishedAt,
            modifiedTime: updatedAt,
            authors: [`${siteConfig.siteUrl}/autores/${author?.uid || 'dediabetes'}`],
          },
        }}
        twitter={{
          handle: siteConfig.twitterHandle,
          site: siteConfig.twitterHandle,
          cardType: 'summary_large_image',
        }}
      />

      <ArticleJsonLd
        type="Article"
        url={canonicalUrl}
        title={title}
        images={[imageUrl]}
        datePublished={publishedAt}
        dateModified={updatedAt}
        authorName={[{
          name: author?.name || 'Dexdiabetes',
          url: `${siteConfig.siteUrl}/autores/${author?.uid || 'dediabetes'}`,
        }]}
        publisherName={siteConfig.siteName}
        publisherLogo={`${siteConfig.siteUrl}${siteConfig.defaultImage}`}
        description={description}
      />
    </>
  );
};

export default BlogSEO; 