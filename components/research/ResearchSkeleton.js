import React from 'react';

const ResearchSkeleton = () => {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Header Section */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Domain Tags Skeleton */}
        <div className="flex gap-2 mb-6">
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="h-6 w-24 bg-gray-200 rounded-md"
            />
          ))}
        </div>

        {/* Title and Meta Skeleton */}
        <div className="space-y-4 mb-8">
          <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
          <div className="flex gap-4">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Header Image Skeleton */}
        <div className="mb-16">
          <div className="w-full aspect-video bg-gray-200 rounded-lg" />
        </div>

        {/* Summary Section Skeleton */}
        <section className="mb-16">
          <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-4/6 bg-gray-200 rounded" />
          </div>
        </section>

        {/* Study Design Section Skeleton */}
        <section className="mb-16">
          <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
          <div className="bg-secondary/5 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="space-y-3">
                  <div className="h-5 w-32 bg-gray-200 rounded" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2].map((_, idx) => (
                      <div key={idx} className="h-6 w-24 bg-gray-200 rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Study Population Section Skeleton */}
        <section className="mb-16">
          <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
          <div className="bg-secondary/5 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="space-y-3">
                  <div className="h-5 w-32 bg-gray-200 rounded" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2].map((_, idx) => (
                      <div key={idx} className="h-6 w-24 bg-gray-200 rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections Skeleton */}
        {[1, 2, 3].map((_, index) => (
          <section key={index} className="mb-16">
            <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>
          </section>
        ))}

        {/* Newsletter Section Skeleton */}
        <section className="mb-16 max-w-4xl bg-gray-50 mx-auto px-4 py-16 text-center">
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-6" />
          <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto mb-8" />
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 h-12 bg-gray-200 rounded-md" />
              <div className="h-12 w-32 bg-gray-200 rounded-md" />
            </div>
          </div>
        </section>

        {/* Related Posts Skeleton */}
        <section className="mb-16">
          <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="w-full aspect-video bg-gray-200 rounded-lg" />
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResearchSkeleton; 