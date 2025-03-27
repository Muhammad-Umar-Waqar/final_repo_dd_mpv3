import React, { useState, useEffect, useRef } from 'react';
import { IconSearch, IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const PremiumPopup = ({ onClose }) => {
  const { locale } = useTranslations();
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-md max-w-xs text-center">
        <p className="mb-4">
          {locale === 'en'
            ? "Unlock Advanced Search Using Premium"
            : "Desbloquea la Búsqueda Avanzada con Premium"}
        </p>
        <button
          onClick={() => router.push('/premium')}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          {locale === 'en' ? "Upgrade Now" : "Actualizar Ahora"}
        </button>
        <button
          onClick={onClose}
          className="mt-2 text-sm text-blue-500 underline block mx-auto"
        >
          {locale === 'en' ? "Close" : "Cerrar"}
        </button>
      </div>
    </div>
  );
};

const PremiumPopupFilterSection = ({ onClose }) => {
  const router = useRouter();
  const { locale } = useTranslations();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-md max-w-xs text-center">
        <p className="mb-4">
          {locale === 'en'
            ? "Unlock Advanced Filter Section Using Premium"
            : "Desbloquear sección de filtro avanzado con Premium"}
        </p>
        <button
          onClick={() => router.push('/premium')}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          {locale === 'en' ? "Upgrade Now" : "Actualizar Ahora"}
        </button>
        <button
          onClick={onClose}
          className="mt-2 text-sm text-blue-500 underline block mx-auto"
        >
          {locale === 'en' ? "Close" : "Cerrar"}
        </button>
      </div>
    </div>
  );
};

const BasicSearchSection = ({
  showFilterButton = true,
  isLoading = false,
  autoFocus = false,
  showCategories = true,
}) => {
  const { t, locale } = useTranslations();
  const router = useRouter();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showPremiumFilter, setshowPremiumFilter] = useState(false);
  const inputRef = useRef(null);

  const { data: session } = useSession();
  // Assume premium status is stored in session.user.role
  const isPremium =
    session?.user?.role === "premium" || session?.user?.role === "admin";

  // Default filters for pages where filter button is shown
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

  // Alternate filters for pages where the filter button is hidden (e.g. Articles page)
  const alternateFilters = [
    { id: 'exercise', labelKey: 'searchSection.filters.exercise' },
    { id: 'diet', labelKey: 'searchSection.filters.diet' },
    { id: 'complications', labelKey: 'searchSection.filters.complications' },
    { id: 'symptoms', labelKey: 'searchSection.filters.symptoms' },
    { id: 'treatment', labelKey: 'searchSection.filters.treatment' },
  ];

  // Initialize state from URL on mount
  useEffect(() => {
    if (router.isReady) {
      const { q } = router.query;
      if (q) setSearchTerm(q);
    }
  }, [router.isReady]);

  const handleSearch = () => {
    const newQuery = { ...router.query };
    if (searchTerm) {
      newQuery.q = searchTerm;
    } else {
      delete newQuery.q;
    }
    // Reset to page 1 when searching
    delete newQuery.page;
    router.push(
      { pathname: router.pathname, query: newQuery },
      undefined,
      { shallow: true }
    );
  };

  const handleFilterClick = () => {
    if (!isPremium) {
      setShowPremiumPopup(true);
      return;
    }
    // Your filtering logic here if premium
  };

  const handleFilterSectionClick = () => {
    if (!isPremium) {
      setshowPremiumFilter(true);
      return;
    }
    // Your filter section logic here if premium
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const Overlay = () => (
    <div
      className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
        isFilterMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } z-40`}
      onClick={() => setIsFilterMenuOpen(false)}
    />
  );

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const { docType } = router.query;
  const isResearchActive = docType === 'research';
  const isBlogPostActive = !docType || docType === 'blog_post';

  // Decide which filter list to render based on the value of showFilterButton.
  const filtersToRender = showFilterButton ? defaultFilters : alternateFilters;

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
              onClick={handleSearch}
              disabled={isLoading}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 sm:px-6 py-1.5 sm:py-2 bg-primary text-primary-foreground text-sm rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? t('searchSection.searching')
                : t('searchSection.searchButton')}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center justify-center sm:justify-start w-full sm:max-w-[85%] md:max-w-[75%] lg:max-w-[70%] mx-auto">
          {showCategories ? (
            filtersToRender.map((filter) => {
              const isActive =
                filter.id === 'all'
                  ? activeFilters.length === 0
                  : activeFilters.includes(filter.domain);
              return (
                <button
                  key={filter.id}
                  onClick={() => handleFilterClick()}
                  className="text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-colors text-xs border-input bg-background hover:bg-secondary/10"
                >
                  {t(filter.labelKey)}
                </button>
              );
            })
          ) : (
            <>
              <button
                onClick={() => {
                  router.push(
                    {
                      pathname: router.pathname,
                      query: { ...router.query, docType: 'research' },
                    },
                    undefined,
                    { shallow: true }
                  );
                }}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-colors text-xs 
          ${isResearchActive ? 'bg-primary text-primary-foreground border-primary' : 'bg-white text-black border-input hover:bg-secondary/10'}`}
              >
                {locale === 'en' ? "Research" : "Investigación"}
              </button>
              <button
                onClick={() => {
                  router.push(
                    {
                      pathname: router.pathname,
                      query: { ...router.query, docType: 'blog_post' },
                    },
                    undefined,
                    { shallow: true }
                  );
                }}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-colors text-xs 
          ${isBlogPostActive ? 'bg-primary text-primary-foreground border-primary' : 'bg-white text-black border-input hover:bg-secondary/10'}`}
              >
                {locale === 'en' ? "Articles" : "Artículo"}
              </button>
            </>
          )}

          {showFilterButton && (
            <button
              onClick={() => handleFilterSectionClick()}
              className="bg-gray-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-input bg-background hover:bg-secondary/10 transition-colors text-xs flex items-center gap-1.5 sm:gap-2"
            >
              <IconAdjustmentsHorizontal className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 " />
              <span className="hidden xs:inline">
                {t('searchSection.filterButton')}
              </span>
            </button>
          )}
        </div>
      </section>

      <Overlay />

      {showPremiumPopup && (
        <PremiumPopup onClose={() => setShowPremiumPopup(false)} />
      )}
      {showPremiumFilter && (
        <PremiumPopupFilterSection
          onClose={() => setshowPremiumFilter(false)}
        />
      )}
    </>
  );
};

export default BasicSearchSection;
