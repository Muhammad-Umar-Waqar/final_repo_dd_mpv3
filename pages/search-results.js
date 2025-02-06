import React from 'react';
import { useTranslations } from '../utils/i18n';
import NewsCard from '../components/NewsCard';

const SearchResults = ({ posts = [], currentPage = 1, totalPages = 1 }) => {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Results
        </h1>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <NewsCard
              key={index}
              category={post.category}
              title={post.title}
              description={post.description}
              publisher={post.publisher}
              publishDate={post.publishDate}
              timeToRead={post.timeToRead}
            />
          ))}
        </div>

        {/* Show message if no results */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No results found
            </p>
          </div>
        )}
        
        {/* Pagination */}
        {posts.length > 0 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button 
              className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
            >
              {t('newsGrid.pagination.previous')}
            </button>
            
            {[...Array(totalPages)].map((_, i) => {
              const pageNumber = i + 1;
              const isCurrentPage = pageNumber === currentPage;
              
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      isCurrentPage
                        ? 'text-primary-foreground bg-primary hover:bg-primary/90'
                        : 'text-foreground bg-background border border-border hover:bg-secondary/10'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return (
                  <span key={pageNumber} className="px-3 py-2 text-sm text-muted-foreground">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages}
            >
              {t('newsGrid.pagination.next')}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;