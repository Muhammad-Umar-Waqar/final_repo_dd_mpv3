import React, { useState, useEffect, useRef } from 'react';
import { IconSearch, IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';
import FilterMenu from './FilterMenu';
import { useRouter } from 'next/router';

// Custom debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

const PremiumSearchSection = ({
  showFilterButton = true,
  isLoading = false,
  autoFocus = false,
  showCategories = true,
}) => {
  const { t } = useTranslations();
  const router = useRouter();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [dynamicCategories, setDynamicCategories] = useState([]);
  const inputRef = useRef(null);

  // Create a debounced version of searchTerm (500ms delay)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Initialize state from URL query
  useEffect(() => {
    if (router.isReady) {
      const { q, domains } = router.query;
      if (q) setSearchTerm(q);
      if (domains) {
        const domainFilters = Array.isArray(domains) ? domains : [domains];
        setActiveFilters(domainFilters);
      }
    }
  }, [router.isReady]);

  // Update URL query when the debounced search term changes
  useEffect(() => {
    const newQuery = { ...router.query };
    if (debouncedSearchTerm) newQuery.q = debouncedSearchTerm;
    else delete newQuery.q;
    // Reset page when search term changes
    delete newQuery.page;
    router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
  }, [debouncedSearchTerm]);

  // Fetch dynamic categories when showFilterButton is false (i.e. on the Articles page)
  useEffect(() => {
    if (!showFilterButton) {
      const fetchCategories = async () => {
        try {
          const res = await fetch('/api/prismic/categories');
          const data = await res.json();
          setDynamicCategories(data);
        } catch (err) {
          console.error("Error fetching dynamic categories");
        }
      };
      fetchCategories();
    }
  }, [showFilterButton]);

  // Define a mapping function to get localized domain values.
  // const getLocalizedDomain = (domain) => {
  //   // Adjust these mappings as needed.
  //   const mapping = {
  //     exercise: { en: "exercise", es: "ejercicio" },
  //     complications: { en: "complications", es: "complicaciones" },
  //     symptoms: { en: "symptoms", es: "síntomas" },
  //     diet: { en: "diet", es: "alimentacion" },
  //     treatment: { en: "treatment", es: "tratamiento" },
  //   };

  //   // For research pages, always show the English version for "complications"
  // if (router.query.docType === "research" && domain === "complications") {
  //   return "Diabetes Complications";
  // }

  
  //   if (mapping[domain]) {
  //     return router.locale === "es" ? mapping[domain].es : mapping[domain].en;
  //   }
  //   return domain;
  // };

  const getLocalizedDomain = (domain) => {
    // Determine if we're on the research (index) page.
    const isResearchPage = router.pathname === '/';
    
    // For research page, override complications mapping to always be "Diabetes Complications".
    if (isResearchPage && domain === "complications") {
      return "Diabetes Complications";
    }
  
    // Normal mapping for other cases.
    const mapping = {
      exercise: { en: "exercise", es: "ejercicio" },
      complications: { en: "complications", es: "complicaciones" },
      symptoms: { en: "symptoms", es: "síntomas" },
      diet: { en: "diet", es: "alimentacion" },
      treatment: { en: "treatment", es: "tratamiento" },
    };
    return router.locale === "es" ? mapping[domain]?.es || domain : mapping[domain]?.en || domain;
  };
  

  // Handle filter button clicks.
  // For dynamic categories, we expect filter.domain === category id.
  const handleFilterClick = (filter) => {
    let newFilters;
    if (filter.id === 'all') {
      newFilters = []; 
    } else {
      const isActive = activeFilters.includes(filter.domain);
      newFilters = isActive 
        ? activeFilters.filter(f => f !== filter.domain)
        : [...activeFilters, filter.domain];
    }
    setActiveFilters(newFilters);
    const newQuery = { ...router.query };
    if (newFilters.length > 0) {
      // Map each filter value to its localized version if needed.
      newQuery.domains = newFilters.map(domain => getLocalizedDomain(domain));
    } else {
      delete newQuery.domains;
    }
    delete newQuery.page;
    router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
  };

  // Optionally handle the Enter key (instant search already handled by debouncing)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // With debouncing the query updates automatically
    }
  };

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  const { docType } = router.query;
  const isResearchActive = docType === 'research';
  const isBlogPostActive = !docType || docType === 'blog_post';

  // Define static filters for pages that use the filter button.
  // When showFilterButton is false, we’ll use dynamicCategories.
  const defaultFilters = [
    { id: 'all', labelKey: 'searchSection.filters.all' },
    { id: 'behavioral', labelKey: 'searchSection.filters.behavioral', domain: 'behavioral' },
    { id: 'complications', labelKey: 'searchSection.filters.complications', domain: 'complications' },
    { id: 'digital', labelKey: 'searchSection.filters.digital', domain: 'digital' },
    { id: 'pharmacology', labelKey: 'searchSection.filters.pharmacology', domain: 'pharmacology' },
    { id: 'prevention', labelKey: 'searchSection.filters.prevention', domain: 'prevention' },
    { id: 'supplements', labelKey: 'searchSection.filters.supplements', domain: 'supplements' },
    { id: 't1d', labelKey: 'searchSection.filters.t1d', domain: 't1d' },
  ];

  const alternateFilters = [
    { id: 'exercise', labelKey: 'searchSection.filters.exercise' },
    { id: 'complications', labelKey: 'searchSection.filters.complications' },
    { id: 'symptoms', labelKey: 'searchSection.filters.symptoms' },
    { id: 'diet', labelKey: 'searchSection.filters.diet' },
    { id: 'treatment', labelKey: 'searchSection.filters.treatment' },
  ];

  // Decide which filter list to render.
  // When showFilterButton is false, we prefer dynamic categories if available.
  const filtersToRender =
    !showFilterButton && dynamicCategories.length > 0
      ? dynamicCategories.map(cat => ({
          id: cat.id,
          // For dynamic filters, we set "domain" to the category id.
          domain: cat.id,
          // We'll use the label from the API (which should already be localized if needed),
          // but the translation function can still be applied if desired.
          labelKey: cat.label,
        }))
      : showFilterButton
      ? defaultFilters
      : alternateFilters;

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-4 sm:mb-6 w-full sm:max-w-[85%] md:max-w-[75%] lg:max-w-[70%] mx-auto">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('searchSection.searchPlaceholder')}
              className="w-full pl-10 pr-24 py-2.5 sm:py-3 rounded-full border border-input bg-background text-foreground text-sm sm:text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={() =>
                router.push({
                  pathname: router.pathname,
                  query: { ...router.query, q: searchTerm },
                })
              }
              disabled={isLoading}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 sm:px-6 py-1.5 sm:py-2 bg-primary text-primary-foreground text-sm rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('searchSection.searching') : t('searchSection.searchButton')}
            </button>
          </div>
        </div>

        {showCategories ? (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center justify-center sm:justify-start w-full sm:max-w-[85%] md:max-w-[75%] lg:max-w-[70%] mx-auto">
            {filtersToRender.map((filter) => {
              const isActive =
                filter.id === 'all'
                  ? activeFilters.length === 0
                  : activeFilters.includes(filter.domain);
              return (
                <button
                  key={filter.id}
                  onClick={() => handleFilterClick(filter)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-colors text-xs ${
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-input bg-background hover:bg-secondary/10'
                  }`}
                >
                  {t(filter.labelKey)}
                </button>
              );
            })}
            {showFilterButton && (
              <button
                onClick={() => setIsFilterMenuOpen(true)}
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-input bg-background hover:bg-secondary/10 transition-colors text-xs flex items-center gap-1.5 sm:gap-2"
              >
                <IconAdjustmentsHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">{t('searchSection.filterButton')}</span>
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center justify-center sm:justify-start w-full sm:max-w-[85%] md:max-w-[75%] lg:max-w-[70%] mx-auto">
            <button 
              onClick={() => {
                router.push({
                  pathname: router.pathname,
                  query: { ...router.query, docType: 'research' }
                }, undefined, { shallow: true });
              }}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-colors text-xs 
                ${isResearchActive ? 'bg-primary text-primary-foreground border-primary' : 'bg-white text-black border-input hover:bg-secondary/10'}`}
            >
              Research
            </button>
            <button 
              onClick={() => {
                router.push({
                  pathname: router.pathname,
                  query: { ...router.query, docType: 'blog_post' }
                }, undefined, { shallow: true });
              }}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-colors text-xs 
                ${isBlogPostActive ? 'bg-primary text-primary-foreground border-primary' : 'bg-white text-black border-input hover:bg-secondary/10'}`}
            >
              Articles
            </button>
          </div>
        )}
      </section>

      {/* Overlay for filter menu */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isFilterMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } z-40`}
        onClick={() => setIsFilterMenuOpen(false)}
      />

      <FilterMenu
        isOpen={isFilterMenuOpen}
        onClose={() => setIsFilterMenuOpen(false)}
      />
    </>
  );
};

export default PremiumSearchSection;