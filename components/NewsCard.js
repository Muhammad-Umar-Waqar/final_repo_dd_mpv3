import React from 'react';
import { IconClock } from '@tabler/icons-react';

const NewsCard = ({ category, title, description, timeToRead }) => {
  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[16/9] bg-muted">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" className="w-full h-full">
          <rect width="400" height="225" fill="#f5f5f5"/>
          <rect x="40" y="60" width="320" height="10" rx="2" fill="#e0e0e0"/>
          <rect x="40" y="85" width="280" height="10" rx="2" fill="#e0e0e0"/>
          <rect x="40" y="110" width="320" height="10" rx="2" fill="#e0e0e0"/>
          <rect x="40" y="135" width="200" height="10" rx="2" fill="#e0e0e0"/>
          <circle cx="200" cy="90" r="30" fill="#e0e0e0"/>
          <path d="M190 90 h20 m-10 -10 v20" stroke="#f5f5f5" strokeWidth="2"/>
          <text x="200" y="180" fontFamily="Arial, sans-serif" fontSize="12" fill="#cccccc" textAnchor="middle">
            Image placeholder
          </text>
        </svg>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <span className="text-xs font-medium text-primary px-2.5 py-1 bg-primary/10 rounded-full">
            {category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <IconClock className="w-4 h-4 mr-1" />
          <span>{timeToRead} min read</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;