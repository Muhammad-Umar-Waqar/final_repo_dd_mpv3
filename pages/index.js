// pages/index.js
import Head from 'next/head';
import { useTranslations } from '../utils/i18n';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import SearchSection from '../components/SearchSection';
import NewsGrid from '../components/NewsGrid';
import Footer from '../components/Footer';

export default function Home() {
  const { t, locale } = useTranslations();
  console.log(locale);
  const router = useRouter();
  const [searchResults, setSearchResults] = useState({
    results: [],
    total: 0,
    page: 1,
    totalPages: 0
  });
  const [isLoading, setIsLoading] = useState(false);

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
        
        // Get all query parameters
        const {
          q,              // search term
          page = 1,       // current page
          limit = 6,      // results per page
          outcomes,       // outcomes filter
          interventions,  // interventions filter
          trialType,     // trial type filter
          trialSize,     // trial size filter
          trialDuration, // trial duration filter
          geography,     // geography filter
          year,          // publication year
          sponsorship,   // sponsorship filter
          domains        // domains filter
        } = router.query;

        // Build query string
        const queryParams = new URLSearchParams();
        
        // Add all parameters if they exist
        if (q) queryParams.append('q', q);
        if (page) queryParams.append('page', page);
        if (limit) queryParams.append('limit', limit);
        queryParams.append('lang', dbLocale);
        
        // Handle array parameters
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

        // Add single value parameters
        if (year) queryParams.append('year', year);
        if (sponsorship) queryParams.append('sponsorship', sponsorship);

        // Make API request
        const response = await fetch(`/api/research/search?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [router.isReady, router.query]); // Dependencies include router readiness and query params

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{`${t('siteName')} - ${t('homeTitle')}`}</title>
        <meta name="description" content={t('homeDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <IntroSection />
      <div className="py-8">
        <SearchSection
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