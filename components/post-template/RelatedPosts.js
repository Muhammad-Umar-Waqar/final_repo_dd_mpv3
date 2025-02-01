// Add this to components/post-template/RelatedPosts.js
import React from 'react';
import Link from 'next/link';

const PostCard = ({ title, date, description, slug }) => (
  <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="aspect-[16/9] bg-muted">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" className="w-full h-full">
        <rect width="400" height="225" fill="#f5f5f5"/>
        <rect x="40" y="60" width="320" height="10" rx="2" fill="#e0e0e0"/>
        <rect x="40" y="85" width="280" height="10" rx="2" fill="#e0e0e0"/>
        <rect x="40" y="110" width="320" height="10" rx="2" fill="#e0e0e0"/>
        <rect x="40" y="135" width="200" height="10" rx="2" fill="#e0e0e0"/>
      </svg>
    </div>
    <div className="p-6">
      <Link href={`/posts/${slug}`}>
        <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
          {title}
        </h3>
      </Link>
      <time className="text-sm text-muted-foreground block mb-3">{date}</time>
      <p className="text-muted-foreground line-clamp-2">
        {description}
      </p>
    </div>
  </div>
);

const RelatedPosts = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl font-bold mb-8">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
