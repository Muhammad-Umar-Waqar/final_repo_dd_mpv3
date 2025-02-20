import React, { useState, useEffect } from 'react';
import { IconLock } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';
import FilterMenu from './FilterMenu';
import { useRouter } from 'next/router';

const SearchSection = ({ showFilterButton = true, isLoading = false }) => {
  const { t } = useTranslations();
  const router = useRouter();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  
  const filters = [
    { id: 'all', labelKey: 'searchSection.filters.all' },
    { id: 'behavioral', labelKey: 'searchSection.filters.behavioral', domain: 'Behavioral Intervention' },
    { id: 'complications', labelKey: 'searchSection.filters.complications', domain: 'Complications' },
    { id: 'digital', labelKey: 'searchSection.filters.digital', domain: 'Digital Health' },
    { id: 'pharmacology', labelKey: 'searchSection.filters.pharmacology', domain: 'Pharmacology' },
    { id: 'prevention', labelKey: 'searchSection.filters.prevention', domain: 'Prevention' },
    { id: 'supplements', labelKey: 'searchSection.filters.supplements', domain: 'Supplements' },
    { id: 't1d', labelKey: 'searchSection.filters.t1d', domain: 'Type 1 Diabetes' },
  ];

  // Initialize state from URL on mount
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

  // Handle search button click
  const handleSearch = () => {
    const newQuery = { ...router.query };
    
    if (searchTerm) {
      newQuery.q = searchTerm;
    } else {
      delete newQuery.q;
    }

    // Reset to page 1 when searching
    delete newQuery.page;

    router.push({
      pathname: router.pathname,
      query: newQuery
    }, undefined, { shallow: true });
  };

  // Handle filter changes
  const handleFilterClick = (filter) => {
    let newFilters;
    
    if (filter.id === 'all') {
      newFilters = [];
    } else {
      const isActive = activeFilters.includes(filter.domain);
      if (isActive) {
        newFilters = activeFilters.filter(f => f !== filter.domain);
      } else {
        newFilters = [...activeFilters, filter.domain];
      }
    }

    setActiveFilters(newFilters);

    const newQuery = { ...router.query };
    if (newFilters.length > 0) {
      newQuery.domains = newFilters;
    } else {
      delete newQuery.domains;
    }

    // Reset to page 1 when filters change
    delete newQuery.page;

    router.push({
      pathname: router.pathname,
      query: newQuery
    }, undefined, { shallow: true });
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Add overlay when filter menu is open
  const Overlay = () => (
    <div
      className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
        isFilterMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } z-40`}
      onClick={() => setIsFilterMenuOpen(false)}
    />
  );

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-6 max-w-[70%] mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('searchSection.searchPlaceholder')}
            className="w-full px-4 py-3 rounded-full border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t('searchSection.searching') : t('searchSection.searchButton')}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 items-center max-w-[70%] mx-auto text-xs">
          {filters.map((filter) => {
            const isActive = filter.id === 'all' 
              ? activeFilters.length === 0 
              : activeFilters.includes(filter.domain);
            
            return (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter)}
                className={`px-3 py-1.5 rounded-full border transition-colors text-xs
                  ${isActive 
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
              className="px-3 py-1.5 rounded-full border border-input bg-background hover:bg-secondary/10 transition-colors text-xs flex items-center gap-2"
            >
              <IconLock className="w-4 h-4" />
              {t('searchSection.filterButton')}
            </button>
          )}
        </div>
      </section>

      <Overlay />
      <FilterMenu 
        isOpen={isFilterMenuOpen} 
        onClose={() => setIsFilterMenuOpen(false)} 
      />
    </>
  );
};

export default SearchSection;
