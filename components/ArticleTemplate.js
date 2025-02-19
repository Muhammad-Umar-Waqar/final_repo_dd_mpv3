import React from 'react';
import { IconPhoto } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';
import BlogPostHeader from './BlogPostHeader';
import Footer from './Footer';
import RelatedPosts from './RelatedPosts';

const ArticleTemplate = ({
  title,
  author,
  publisher,
  publishDate,
  readTime,
  content = "",
  imageUrl = null,
  authorImage = null,
  isDarkMode = false,
  toggleDarkMode = () => {},
  relatedPosts = [],
  categories = []
}) => {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Tags */}
        {categories && categories.length > 0 && (
          <div className="flex gap-2 mb-6">
            {categories.map((category, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 text-sm font-medium text-red-700 bg-red-50 rounded-md"
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
        <figure className="mb-16">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || t('article.defaults.title')}
              className="w-full rounded-lg"
            />
          ) : (
            <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
              <IconPhoto className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </figure>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-16">
          {!content ? (
            <p className="text-gray-500 italic">{t('article.content.noContent')}</p>
          ) : (
            <div 
              dangerouslySetInnerHTML={{ __html: content }} 
              className="prose-headings:font-bold prose-p:mb-4 prose-ul:mb-4 prose-li:mb-2"
            />
          )}
        </article>

        {/* Newsletter Section */}
        <section className="bg-secondary/5 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-4">
            {t('article.newsletter.title')}
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            {t('article.newsletter.description')}
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder={t('article.newsletter.emailPlaceholder')}
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              />
              <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                {t('article.newsletter.subscribeButton')}
              </button>
            </div>
          </form>
        </section>
        
        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArticleTemplate;
