import React, { useState } from 'react';
import { IconLock } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';
import FilterMenu from './FilterMenu';

const SearchSection = ({ showFilterButton = true }) => {
  const { t } = useTranslations();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  const filters = [
    { id: 'all', labelKey: 'searchSection.filters.all' },
    { id: 'behavioral', labelKey: 'searchSection.filters.behavioral' },
    { id: 'complications', labelKey: 'searchSection.filters.complications' },
    { id: 'digital', labelKey: 'searchSection.filters.digital' },
    { id: 'pharmacology', labelKey: 'searchSection.filters.pharmacology' },
    { id: 'prevention', labelKey: 'searchSection.filters.prevention' },
    { id: 'supplements', labelKey: 'searchSection.filters.supplements' },
    { id: 't1d', labelKey: 'searchSection.filters.t1d' },
  ];

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-4xl font-bold text-center mb-8">
          {t('searchSection.title')}
        </h2>
        
        <div className="relative mb-6 max-w-[70%] mx-auto">
          <input
            type="text"
            placeholder={t('searchSection.searchPlaceholder')}
            className="w-full px-4 py-3 rounded-full border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            {t('searchSection.searchButton')}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 items-center max-w-[70%] mx-auto text-xs">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className="px-3 py-1.5 rounded-full border border-input bg-background hover:bg-secondary/10 transition-colors text-xs"
            >
              {t(filter.labelKey)}
            </button>
          ))}
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
