import React from 'react';
import { IconClock, IconBookmark } from '@tabler/icons-react';
import ShareMenu from './ShareMenu';
import Link from 'next/link';
import { useTranslations } from '../utils/i18n';

const NewsCard = ({
  category,
  title,
  description,
  publisher,
  publishDate,
  timeToRead,
  type,
  uid,
  featuredImage
}) => {
  const { t } = useTranslations();

    // Function to convert UNIX timestamp to 'YYYY-MM-DD' format
    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000); // Convert to milliseconds
      return date.toISOString().split('T')[0]; // Extract 'YYYY-MM-DD'
    };



  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[16/9] relative bg-muted">
        {featuredImage ? (
          <img
            src={featuredImage}
            alt={title}
            className="aspect-[16/9] object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" className="w-full h-full">
              <rect width="400" height="225" fill="#f5f5f5" />
              <rect x="40" y="60" width="320" height="10" rx="2" fill="#e0e0e0" />
              <rect x="40" y="85" width="280" height="10" rx="2" fill="#e0e0e0" />
              <rect x="40" y="110" width="320" height="10" rx="2" fill="#e0e0e0" />
              <rect x="40" y="135" width="200" height="10" rx="2" fill="#e0e0e0" />
              <circle cx="200" cy="90" r="30" fill="#e0e0e0" />
              <path d="M190 90 h20 m-10 -10 v20" stroke="#f5f5f5" strokeWidth="2" />
              <text x="200" y="180" fontFamily="Arial, sans-serif" fontSize="12" fill="#cccccc" textAnchor="middle">
                Image placeholder
              </text>
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-3">
          <span className="text-xs font-medium text-primary px-2.5 py-1 bg-primary/10 rounded-full">
            {category}
          </span>
        </div>
        <Link href={type === 'research' ? `/${uid}` : `/blog/${uid}`}>
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <hr className="border-border mb-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <h4 className="text-sm font-medium text-foreground">{publisher}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <time>{formatDate(publishDate)}</time>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-secondary/10 rounded-full"
              title={t('article.header.bookmark')}
            >
              <IconBookmark className="w-5 h-5" />
            </button>
            <ShareMenu title={title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;