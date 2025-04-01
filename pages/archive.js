import Head from 'next/head';
import { useTranslations } from '../utils/i18n';
import SearchSection from '../components/SearchSection';
import NewsGrid from '../components/NewsGrid';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";

export default function Archive() {
  const { data: session } = useSession();
  const { t, locale } = useTranslations();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState({
    results: [],
    total: 0,
    page: 1,
    totalPages: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);

        // Map URL locales to database locales
        const databaseLocales = {
          en: 'en-us',
          es: 'es-es'
        };
        const dbLocale = databaseLocales[locale] || locale;

        // Destructure query parameters from the router
        const {
          q,
          page = 1,
          limit = 6,
          outcomes,
          interventions,
          trialType,
          trialSize,
          trialDuration,
          geography,
          year,
          sponsorship,
          domains,
          docType = 'blog_post'
        } = router.query;

      // Determine the API endpoint based on user role and docType
      let endpoint;
      if (session && (session.user.role === "admin" || session.user.role === "premium")) {
        // Premium users get typesense endpoints for both research and blog posts
        
          endpoint = '/api/research/typesense-search';
        
      } else {
        // Basic (or not logged in) users use the standard endpoints
        if (docType === 'research') {
          endpoint = '/api/research/search';
        } else {
          endpoint = '/api/blog/search';
        }
      }


        // Build query string
        const queryParams = new URLSearchParams();
        if (q) queryParams.append('q', q);
        if (page) queryParams.append('page', page);
        if (limit) queryParams.append('limit', limit);
        queryParams.append('lang', dbLocale);
        queryParams.append('type', docType);

        // Helper to append array parameters
        const appendArrayParam = (param, name) => {
          if (!param) return;
          (Array.isArray(param) ? param : [param]).forEach(value =>
            queryParams.append(name, value)
          );
        };

        appendArrayParam(outcomes, 'outcomes');
        appendArrayParam(interventions, 'interventions');
        appendArrayParam(trialType, 'trialType');
        appendArrayParam(trialSize, 'trialSize');
        appendArrayParam(trialDuration, 'trialDuration');
        appendArrayParam(geography, 'geography');
        appendArrayParam(domains, 'domains');

        if (year) queryParams.append('year', year);
        if (sponsorship !== undefined) queryParams.append('sponsorship', sponsorship);

        // Make API request to the determined endpoint
        const response = await fetch(`${endpoint}?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Search request failed');
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [router.isReady, router.query, session, locale]);

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{`${t('siteName')} - ${t('archive.pageTitle')}`}</title>
        <meta name="description" content={t('archive.description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Archive Hero Section */}
      <main className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            <span className="text-primary">{t('archive.title')}</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            {t('archive.subtitle')}
          </p>
        </div>
      </main>

      {/* Search Section */}
      <div className="py-8">
        <SearchSection 
          showFilterButton={false}
          isLoading={isLoading} 
          autoFocus={true}
          showCategories={false}
        />
      </div>

      {/* Results Grid */}
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
