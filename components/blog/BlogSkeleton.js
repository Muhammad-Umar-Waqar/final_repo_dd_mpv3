import React from 'react';

const BlogSkeleton = () => {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Tags Skeleton */}
        <div className="flex gap-2 mb-6">
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="h-7 w-24 bg-red-50 rounded-md"
            />
          ))}
        </div>

        {/* Article Header Skeleton */}
        <div className="mb-8">
          {/* Title */}
          <div className="h-10 w-3/4 bg-gray-200 rounded-lg mb-4" />
          
          {/* Author and Meta Info */}
          <div className="flex items-center gap-4">
            {/* Author Image */}
            <div className="h-12 w-12 rounded-full bg-gray-200" />
            
            <div className="space-y-2">
              {/* Author Name */}
              <div className="h-4 w-40 bg-gray-200 rounded" />
              {/* Publisher & Date */}
              <div className="flex gap-3">
                <div className="h-3 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <figure className="mb-16">
          <div className="w-full aspect-video bg-gray-200 rounded-lg" />
        </figure>

        {/* Article Content Skeleton */}
        <article className="prose prose-lg max-w-none mb-16">
          <div className="space-y-8">
            {/* Paragraphs */}
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="space-y-4">
                {/* Heading */}
                {index === 0 && (
                  <div className="h-6 w-2/3 bg-gray-200 rounded mb-6" />
                )}
                {/* Paragraph lines */}
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-11/12 bg-gray-200 rounded" />
                <div className="h-4 w-4/5 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </article>

        {/* Newsletter Section Skeleton */}
        <section className="bg-secondary/5 rounded-lg p-8 mb-16">
          <div className="h-8 w-2/3 bg-gray-200 rounded-lg mx-auto mb-4" />
          <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto mb-6" />
          <div className="max-w-md mx-auto flex gap-4">
            <div className="flex-1 h-10 bg-gray-200 rounded-md" />
            <div className="h-10 w-28 bg-gray-200 rounded-md" />
          </div>
        </section>

        {/* Related Posts Section Skeleton */}
        <div className="mb-16">
          <div className="h-8 w-64 bg-gray-200 rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="w-full aspect-video bg-gray-200 rounded-lg" />
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <div className="bg-secondary/5 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="h-8 w-32 bg-gray-200 rounded mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="h-5 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton; 