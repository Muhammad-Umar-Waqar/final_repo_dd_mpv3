import React from 'react';
import { IconPhoto } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';
import BlogPostHeader from './BlogPostHeader';
import Footer from './Footer';
import RelatedPosts from './RelatedPosts';
import NewsletterSection from './common/newsletter';
import SliceZone from './SliceZone';
import { Alert } from '@mui/material';

const ArticleTemplate = ({
  title,
  author,
  publisher,
  publishDate,
  readTime,
  body = [],
  content = "",
  imageUrl = null,
  authorImage = null,
  isDarkMode = false,
  toggleDarkMode = () => { },
  relatedPosts = [],
  categories = []
}) => {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Category Tags */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {categories.map((category, index) => (
              <span
                key={index}
                className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-red-700 bg-red-50 rounded-md"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Article Header */}
        <BlogPostHeader
          title={title}
          publisher={publisher}
          publishDate={publishDate}
          readTime={readTime}
          type="article"
          author={author}
          authorImage={authorImage}
        />

        {/* Featured Image */}
        <figure className="mb-8 sm:mb-16">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || t('article.defaults.title')}
              className="w-full aspect-video object-cover rounded-lg"
            />
          ) : (
            <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
              <IconPhoto className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground" />
            </div>
          )}
        </figure>

        {/* Article Content */}
        {/* <article className="prose prose-lg max-w-none mb-8 sm:mb-16">
          {!content ? (
            <p className="text-muted-foreground italic mb-4">{t('article.content.noContent')}</p>
          ) : (
            <div 
              dangerouslySetInnerHTML={{ __html: content }} 
              className="prose-headings:mb-4 sm:prose-headings:mb-6 prose-headings:font-bold prose-p:mb-4 prose-ul:mb-4 prose-li:mb-2 prose-img:rounded-lg prose-img:my-8"
            />
          )}
        </article> */}

        <div className='[&_a]:text-[#eb4a4b] [&_a:hover]:underline'>
          <span data-typesense-field="description">
            <SliceZone allSlices={body} />
          </span>
        </div>

        {/* Alert Box */}
        <Alert severity="warning" variant='outlined' className="my-8 italic !prose !text-yellow-900">
          {t('article.alert_box')}
        </Alert>

        {/* Newsletter Section */}
        <div className="mt-8 mb-8 sm:mb-16">
          <NewsletterSection />
        </div>

        {/* Related Posts Section */}
        {!relatedPosts.length > 0 && (
          <div className="mb-8 sm:mb-16">
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}
      </main>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ArticleTemplate;
