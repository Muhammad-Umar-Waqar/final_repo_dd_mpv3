import React from 'react';
import { IconBookmark, IconUser } from '@tabler/icons-react';
import { format, parse } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useTranslations } from '../utils/i18n';
import ShareMenu from './ShareMenu';

const BlogPostHeader = ({ title, publisher, publishDate, type, author, authorImage }) => {
  const { t, locale } = useTranslations();

  const formatDate = (date) => {
    try {
      const dateLocale = locale === 'es' ? es : enUS;
      const dateFormat = locale === 'es' ? "d 'de' MMMM, yyyy" : 'MMMM d, yyyy';
      
      if (date instanceof Date) {
        return format(date, dateFormat, { locale: dateLocale });
      }

      let parsedDate;
      
      if (date.includes('-')) {
        parsedDate = new Date(date);
      }
      else if (date.includes('/')) {
        const [day, month, year] = date.split('/');
        parsedDate = new Date(year, month - 1, day);
      }
      else if (/^\d{4}$/.test(date)) {
        return date;
      }
      else {
        parsedDate = new Date(date);
      }

      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date');
      }

      return format(parsedDate, dateFormat, { locale: dateLocale });
    } catch (error) {
      console.error('Error formatting date:', error);
      return date;
    }
  };

  console.log('BlogPostHeader rendered with:', { type, author, authorImage });
  return (
    <header className="mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
        {title || t('article.defaults.title')}
      </h1>
      <hr className="border-border mb-6" />
      <div className="flex items-center justify-between mb-6">
        {type === 'article' ? (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              {authorImage ? (
                <img 
                  src={authorImage} 
                  alt={author || t('article.defaults.author')} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log('Author image failed to load:', authorImage);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-full h-full bg-secondary/20 flex items-center justify-center ${authorImage ? 'hidden' : ''}`}
              >
                <IconUser className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground">
                {author || publisher || t('article.defaults.author')}
              </h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time>
                  {t('article.header.publishedOn')} {/^\d{4}$/.test(publishDate) ? publishDate : formatDate(publishDate)}
                </time>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div>
              <h4 className="font-medium text-foreground">
                {publisher || t('article.defaults.publisher')}
              </h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time>
                  {t('article.header.publishedOn')} {/^\d{4}$/.test(publishDate) ? publishDate : formatDate(publishDate)}
                </time>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <button 
            className="p-2 hover:bg-secondary/10 rounded-full"
            title={t('article.header.bookmark')}
          >
            <IconBookmark className="w-6 h-6" />
          </button>
          <ShareMenu title={title} />
        </div>
      </div>
      <hr className="border-border" />
    </header>
  );
};

export default BlogPostHeader;
