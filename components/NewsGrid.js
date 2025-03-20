import React from 'react';
import { useTranslations } from '../utils/i18n';
import NewsCard from './NewsCard';
import Pagination from './ui/pagination';

const NewsGrid = ({ results = [], total = 0, page = 1, totalPages = 1, isLoading = false,  }) => {
  const { t } = useTranslations();

  // Loading skeleton for cards
  const LoadingSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div 
          key={index} 
          className="bg-background border border-border rounded-lg overflow-hidden animate-pulse"
        >
          {/* Image placeholder */}
          <div className="aspect-[16/9] bg-muted" />
          
          <div className="p-6">
            {/* Category and type */}
            <div className="flex items-center justify-between mb-3">
              <div className="h-6 w-24 bg-muted rounded-full" />
            </div>

            {/* Title */}
            <div className="space-y-2 mb-2">
              <div className="h-6 w-3/4 bg-muted rounded" />
            </div>

            {/* Description */}
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-2/3 bg-muted rounded" />
            </div>

            <hr className="border-border mb-4" />

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-muted rounded" />
                <div className="h-3 w-48 bg-muted rounded" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-muted rounded-full" />
                <div className="h-8 w-8 bg-muted rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  // No results state
  if (!isLoading && (!results || results.length === 0)) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium text-foreground mb-2">
            {t('newsGrid.noResults.title')}
          </h3>
          <p className="text-muted-foreground">
            {t('newsGrid.noResults.description')}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          results.map((item, index) => (
            <NewsCard
              key={`${item.type}-${item.uid}-${index}`}
              category={item.category}
              title={item.title}
              description={item.description}
              publisher={item.publisher}
              publishDate={item.publishDate}
              year={item.year}
              timeToRead={item.timeToRead}
              featuredImage={item.featuredImage}
              type={item.type}
              uid={item.uid}
            />
          ))
        )}
      </div>
      
      {/* Pagination */}
      <Pagination totalPages={totalPages} />
    </section>
  );
};

export default NewsGrid;