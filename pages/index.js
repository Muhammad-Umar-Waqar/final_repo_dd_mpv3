// // // pages/in-x.js
// import Head from 'next/head';
// import { useTranslations } from '../utils/i18n';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import Hero from '../components/Hero';
// import IntroSection from '../components/IntroSection';
// import SearchSection from '../components/SearchSection';
// import NewsGrid from '../components/NewsGrid';
// import Footer from '../components/Footer';

// export default function Home() {
//   const { t, locale } = useTranslations();
//   const router = useRouter();
//   const [searchResults, setSearchResults] = useState({
//     results: [],
//     total: 0,
//     page: 1,
//     totalPages: 0
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   // Effect to handle search when URL params change
//   useEffect(() => {
//     // Wait for router to be ready
//     if (!router.isReady) return;

//     const fetchSearchResults = async () => {
//       try {
//         setIsLoading(true);
        
//         // Map URL locales to database locales
//         const databaseLocales = {
//           'en': 'en-us',
//           'es': 'es-es'
//         };
//         const dbLocale = databaseLocales[locale] || locale;
        
//         // Get all query parameters
//         const {
//           q,              // search term
//           page = 1,       // current page
//           limit = 6,      // results per page
//           outcomes,       // outcomes filter
//           interventions,  // interventions filter
//           trialType,     // trial type filter
//           trialSize,     // trial size filter
//           trialDuration, // trial duration filter
//           geography,     // geography filter
//           year,          // publication year
//           sponsorship,   // sponsorship filter
//           domains        // domains filter
//         } = router.query;

//         // Build query string
//         const queryParams = new URLSearchParams();
        
//         // Add all parameters if they exist
//         if (q) queryParams.append('q', q);
//         if (page) queryParams.append('page', page);
//         if (limit) queryParams.append('limit', limit);
//         queryParams.append('lang', dbLocale);
        
//         // Handle array parameters
//         const appendArrayParam = (param, name) => {
//           if (!param) return;
//           (Array.isArray(param) ? param : [param]).forEach(value => 
//             queryParams.append(name, value)
//           );
//         };

//         appendArrayParam(outcomes, 'outcomes');
//         appendArrayParam(interventions, 'interventions');
//         appendArrayParam(trialType, 'trialType');
//         appendArrayParam(trialSize, 'trialSize');
//         appendArrayParam(trialDuration, 'trialDuration');
//         appendArrayParam(geography, 'geography');
//         appendArrayParam(domains, 'domains');

//         // Add single value parameters
//         if (year) queryParams.append('year', year);
//         if (sponsorship !== undefined) queryParams.append('sponsorship', sponsorship);

//         // Make API request to research endpoint
//         const response = await fetch(`/api/research/search?${queryParams.toString()}`);
        
//         if (!response.ok) {
//           throw new Error('Search request failed');
//         }

//         const data = await response.json();
//         setSearchResults(data);
//         console.log("Search Result:>:", data.results);

      
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSearchResults();
//   }, [router.isReady, router.query]); // Dependencies include router readiness and query params

//   return (
//     <div className="min-h-screen bg-background">
//       <Head>
//         <title>{`${t('siteName')} - ${t('homeTitle')}`}</title>
//         <meta name="description" content={t('homeDescription')} />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Hero />
//       <IntroSection />
//       <div className="py-8">
//         <SearchSection
//           isLoading={isLoading}
//         />
//       </div>
//       <NewsGrid 
//         results={searchResults.results}
//         total={searchResults.total}
//         page={searchResults.page}
//         totalPages={searchResults.totalPages}
//         isLoading={isLoading}
//       />
//       <div className="mt-auto">
//         <Footer />
//       </div>
//     </div>
//   );
// }































// // pages/index.js
// import Head from 'next/head';
// import { useTranslations } from '../utils/i18n';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import Hero from '../components/Hero';
// import IntroSection from '../components/IntroSection';
// import SearchSection from '../components/SearchSection';
// import NewsGrid from '../components/NewsGrid';
// import Footer from '../components/Footer';

// export default function Home() {
//   const { t, locale } = useTranslations();
//   const router = useRouter();
//   const [searchResults, setSearchResults] = useState({
//     results: [],
//     total: 0,
//     page: 1,
//     totalPages: 0
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   // Handle search when URL parameters change
//   useEffect(() => {
//     if (!router.isReady) return;

//     const fetchSearchResults = async () => {
//       try {
//         setIsLoading(true);
        
//         // Map URL locales to database locales
//         const databaseLocales = {
//           'en': 'en-us',
//           'es': 'es-es'
//         };
//         const dbLocale = databaseLocales[locale] || locale;
        
//         // Get all query parameters
//         const {
//           q,              // search term
//           page = 1,       // current page
//           limit = 6,      // results per page
//           outcomes,       // outcomes filter
//           interventions,  // interventions filter
//           trialType,      // trial type filter
//           trialSize,      // trial size filter
//           trialDuration,  // trial duration filter
//           geography,      // geography filter
//           year,           // publication year
//           sponsorship,    // sponsorship filter
//           domains         // domains filter
//         } = router.query;

//         // Build query string
//         const queryParams = new URLSearchParams();
        
//         if (q) queryParams.append('q', q);
//         if (page) queryParams.append('page', page);
//         if (limit) queryParams.append('limit', limit);
//         queryParams.append('lang', dbLocale);
        
//         // Helper to append array parameters
//         const appendArrayParam = (param, name) => {
//           if (!param) return;
//           (Array.isArray(param) ? param : [param]).forEach(value => 
//             queryParams.append(name, value)
//           );
//         };

//         appendArrayParam(outcomes, 'outcomes');
//         appendArrayParam(interventions, 'interventions');
//         appendArrayParam(trialType, 'trialType');
//         appendArrayParam(trialSize, 'trialSize');
//         appendArrayParam(trialDuration, 'trialDuration');
//         appendArrayParam(geography, 'geography');
//         appendArrayParam(domains, 'domains');

//         if (year) queryParams.append('year', year);
//         if (sponsorship !== undefined) queryParams.append('sponsorship', sponsorship);

//         // Use the Typesense search endpoint
//         const response = await fetch(`/api/research/typesense-search?${queryParams.toString()}`);
//         console.log("response: ", response)
//         if (!response.ok) {
//           throw new Error('Search request failed');
//         }

//         const data = await response.json();
//         setSearchResults(data);
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSearchResults();
//   }, [router.isReady, router.query]);

//   return (
//     <div className="min-h-screen bg-background">
//       <Head>
//         <title>{`${t('siteName')} - ${t('homeTitle')}`}</title>
//         <meta name="description" content={t('homeDescription')} />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Hero />
//       <IntroSection />
//       <div className="py-8">
//         <SearchSection isLoading={isLoading} />
//       </div>
//       <NewsGrid 
//         results={searchResults.results}
//         total={searchResults.total}
//         page={searchResults.page}
//         totalPages={searchResults.totalPages}
//         isLoading={isLoading}
//       />
//       <div className="mt-auto">
//         <Footer />
//       </div>
//     </div>
//   );
// }


































// // pages/in-x.js


// import Head from 'next/head';
// import { useTranslations } from '../utils/i18n';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import Hero from '../components/Hero';
// import IntroSection from '../components/IntroSection';
// import SearchSection from '../components/SearchSection';
// import NewsGrid from '../components/NewsGrid';
// import Footer from '../components/Footer';
// // Suppose we can read from user session or prop
// // For example, if you're using next-auth, you'd do: import { useSession } from "next-auth/react";

// export default function Home() {
//   const { t, locale } = useTranslations();
//   const router = useRouter();
//   const [searchResults, setSearchResults] = useState({
//     results: [],
//     total: 0,
//     page: 1,
//     totalPages: 0
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   // Example: if you have a session with user.role === 'premium'
//   // If you do not have next-auth, you might pass isPremium as a prop or use another approach
//   const isPremium = false; // <-- Replace with your real logic

//   // Effect to handle search when URL params change
//   useEffect(() => {
//     if (!router.isReady) return;

//     const fetchSearchResults = async () => {
//       try {
//         setIsLoading(true);

//         // Map URL locales to database locales
//         const databaseLocales = {
//           en: 'en-us',
//           es: 'es-es'
//         };
//         const dbLocale = databaseLocales[locale] || locale;

//         // Get all query parameters
//         const {
//           q,
//           page = 1,
//           limit = 6,
//           outcomes,
//           interventions,
//           trialType,
//           trialSize,
//           trialDuration,
//           geography,
//           year,
//           sponsorship,
//           domains
//         } = router.query;

//         // Build query string
//         const queryParams = new URLSearchParams();
//         if (q) queryParams.append('q', q);
//         if (page) queryParams.append('page', page);
//         if (limit) queryParams.append('limit', limit);
//         queryParams.append('lang', dbLocale);

//         // Helper for array params
//         const appendArrayParam = (param, name) => {
//           if (!param) return;
//           (Array.isArray(param) ? param : [param]).forEach(value => {
//             queryParams.append(name, value);
//           });
//         };

//         appendArrayParam(outcomes, 'outcomes');
//         appendArrayParam(interventions, 'interventions');
//         appendArrayParam(trialType, 'trialType');
//         appendArrayParam(trialSize, 'trialSize');
//         appendArrayParam(trialDuration, 'trialDuration');
//         appendArrayParam(geography, 'geography');
//         appendArrayParam(domains, 'domains');

//         if (year) queryParams.append('year', year);
//         if (sponsorship !== undefined) queryParams.append('sponsorship', sponsorship);

//         // If user is premium, use the Typesense endpoint; otherwise use the old MongoDB endpoint
//         const endpoint ='/api/research/search'   // Premium
         

//         const response = await fetch(`${endpoint}?${queryParams.toString()}`);
//         if (!response.ok) {
//           throw new Error('Search request failed');
//         }

//         const data = await response.json();
//         setSearchResults(data);
//         console.log("Search Results:", data.results);
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSearchResults();
//   }, [router.isReady, router.query, locale]);

//   return (
//     <div className="min-h-screen bg-background">
//       <Head>
//         <title>{`${t('siteName')} - ${t('homeTitle')}`}</title>
//         <meta name="description" content={t('homeDescription')} />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Hero />
//       <IntroSection />
//       <div className="py-8">
//         {/* Pass isPremium to SearchSection if you want to hide/show filter button or lock icon */}
//         <SearchSection isLoading={isLoading} isPremium={isPremium} />
//       </div>
//       <NewsGrid
//         results={searchResults.results}
//         total={searchResults.total}
//         page={searchResults.page}
//         totalPages={searchResults.totalPages}
//         isLoading={isLoading}
//       />
//       <Footer />
//     </div>
//   );
// }




























// pages/in-x.js
//currentSS
import Head from 'next/head';
import { useTranslations } from '../utils/i18n';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import SearchSection from '../components/SearchSection';
import NewsGrid from '../components/NewsGrid';
import Footer from '../components/Footer';
import { getApiEndpointForUser } from '../utils/getApiEndpointForUser';
import { useSession } from "next-auth/react";


export default function Home() {
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

  const endpoint = getApiEndpointForUser(session?.user?.role);
  console.log("End..", endpoint);
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
          bias_overall, // bias
          domains,        // domains filter
          age,
          duration,
          size,
          region,
          other,
          studyType,
          industrySponsored,
          docType = 'research'
        } = router.query;

        // Build query string
        const queryParams = new URLSearchParams();
        
        // Add all parameters if they exist
        if (q) queryParams.append('q', q);
        if (page) queryParams.append('page', page);
        if (limit) queryParams.append('limit', limit);
        queryParams.append('lang', dbLocale);
        queryParams.append('type', docType);
        // Handle array parameters
        const appendArrayParam = (param, name) => {
          if (!param) return;
          (Array.isArray(param) ? param : [param]).forEach(value => 
            queryParams.append(name, value)
          );
        };
        // And add them to your query string:
        appendArrayParam(age, 'age');
        appendArrayParam(duration, 'duration');
        appendArrayParam(size, 'size');
        appendArrayParam(region, 'region');
        appendArrayParam(other, 'other');
        appendArrayParam(studyType, 'studyType');
        // For industry sponsored, if you decide to keep the key, then:
        if (industrySponsored !== undefined) queryParams.append('industrySponsored', industrySponsored);
        appendArrayParam(outcomes, 'outcomes');
        appendArrayParam(interventions, 'interventions');
        appendArrayParam(trialType, 'trialType');
        appendArrayParam(trialSize, 'trialSize');
        appendArrayParam(trialDuration, 'trialDuration');
        appendArrayParam(geography, 'geography');
        appendArrayParam(domains, 'domains');

        // Add single value parameters
        if (year) queryParams.append('year', year);
        if (bias_overall) queryParams.append('bias_overall', bias_overall);
        if (sponsorship !== undefined) queryParams.append('sponsorship', sponsorship);

        // Make API request to research endpoint

        // const response = await fetch(`/api/research/search?${queryParams.toString()}`);
        
        const response = await fetch(`${endpoint}?${queryParams.toString()}`);

        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data = await response.json();
        setSearchResults(data);
        console.log("Search Result:>:", data.results);

      
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