import Head from 'next/head';
import { useTranslations } from '../utils/i18n';
import SearchSection from '../components/SearchSection';
import NewsGrid from '../components/NewsGrid';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { getApiEndpointForUserArticle } from '../utils/getApiEndpointForUser';
import { getAllBlogCategories } from '../lib/prismic';
// import { getApiEndpointForUser } from '../utils/getApiEndpointForUser';


const ArticlesHero = () => {
  const { t } = useTranslations();
  return (
    <main className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
          <span className="text-primary">{t('articles.title')}</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          {t('articles.subtitle')}
        </p>
      </div>
    </main>
  );
};

export default function Articles() {
  const {data: session, status} = useSession(); 
  const { t, locale } = useTranslations();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState({
    results: [],
    total: 0,
    page: 1,
    totalPages: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const endpoint = getApiEndpointForUserArticle(session?.user?.role);
  

  // Effect to handle search when URL params change
  useEffect(() => {
    // Wait for router to be ready
    if (!router.isReady) return;

    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        
        // Map URL locales to database locales
        const databaseLocales = {
          'en': 'en-us',
          'es': 'es-es'
        };
        const dbLocale = databaseLocales[locale] || locale;
        
        // Get relevant query parameters for blog search
        const {
          q,              // search term
          page = 1,       // current page
          limit = 6,      // results per page
          domains,         // category/domain filter
          docType = 'blog_post'
        } = router.query;

        // Build query string
        const queryParams = new URLSearchParams();
        
        // Add parameters if they exist
        if (q) queryParams.append('q', q);
        if (page) queryParams.append('page', page);
        if (limit) queryParams.append('limit', limit);
        // Handle domains as array parameter
        if (domains) {
          (Array.isArray(domains) ? domains : [domains]).forEach(domain => 
            queryParams.append('domains', domain)
          );
        }
        queryParams.append('lang', dbLocale);
        queryParams.append('type', docType);

        // Make API request to blog search endpoint
        // const response = await fetch(`/api/research/search?${queryParams.toString()}`);
        
        const response = await fetch(`${endpoint}?${queryParams.toString()}`);


        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data = await response.json();
      
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:');
        // Here you could set some error state if needed
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [router.isReady, router.query]); // Dependencies include router readiness and query params

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{`${t('siteName')} - ${t('articles.pageTitle')}`}</title>
        <meta name="description" content={t('articles.description')} />
        <link rel="icon" href="/dd_favicon.png" />
      </Head>

      <ArticlesHero />
      <div className="py-8">
        <SearchSection 
          showFilterButton={false}
          isLoading={isLoading} 
        />
      </div>

      <NewsGrid 
        results={searchResults.results}
        total={searchResults.total}
        page={searchResults.page}
        totalPages={searchResults.totalPages}
        isLoading={isLoading}
      />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
