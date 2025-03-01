import { NextSeo, ArticleJsonLd } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ResearchSEO = ({
    title,
    description,
    publishedAt,
    updatedAt,
    author,
    authorImage,
    featuredImage,
    domains = [],
    siteConfig = {
        siteName: 'Dediabetes',
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://dediabetes.com',
        twitterHandle: '@dediabetes',
        defaultImage: '/images/default-og.jpg',
        defaultLocale: 'es',
        facebook: 'https://facebook.com/dediabetes',
        twitter: 'https://twitter.com/dediabetes'
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

    // Prepare organization data
    const organization = {
        '@type': 'Organization',
        '@id': `${siteConfig.siteUrl}/#organization`,
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
        sameAs: [siteConfig.twitter, siteConfig.facebook],
        logo: {
            '@type': 'ImageObject',
            '@id': `${siteConfig.siteUrl}/#logo`,
            url: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
            contentUrl: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
            caption: siteConfig.siteName
        }
    };

    // Prepare website data
    const website = {
        '@type': 'WebSite',
        '@id': `${siteConfig.siteUrl}#website`,
        url: siteConfig.siteUrl,
        name: siteConfig.siteName,
        description: 'Cuidado de la Diabetes',
        publisher: { '@id': `${siteConfig.siteUrl}/#organization` }
    };

    // Prepare breadcrumb data
    const breadcrumb = {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Inicio',
                item: { '@type': 'Thing', '@id': siteConfig.siteUrl }
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: title,
                item: { '@type': 'Thing', '@id': canonicalUrl }
            }
        ]
    };

    // Prepare person data if author exists
    const person = author ? {
        '@type': 'Person',
        '@id': `${siteConfig.siteUrl}/autores/${author.uid}/#author`,
        url: `${siteConfig.siteUrl}/autores/${author.uid}`,
        name: author.name,
        image: {
            '@type': 'ImageObject',
            '@id': `${siteConfig.siteUrl}#personlogo`,
            url: authorImage,
            caption: author.name
        }
    } : null;

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
                        tags: domains
                    }
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
                    name: author?.name || 'Dediabetes',
                    url: `${siteConfig.siteUrl}/autores/${author?.uid || 'dediabetes'}`,
                }]}
                publisherName={siteConfig.siteName}
                publisherLogo={`${siteConfig.siteUrl}${siteConfig.defaultImage}`}
                description={description}
            />
            
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@graph': [
                                organization,
                                website,
                                breadcrumb,
                                ...(person ? [person] : [])
                            ]
                        })
                    }}
                />
            </Head>
        </>
    );
};

export default ResearchSEO;
