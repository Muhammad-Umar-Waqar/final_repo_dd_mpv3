import Head from 'next/head';
import { useTranslations } from '../utils/i18n';
import SearchSection from '../components/SearchSection';
import NewsGrid from '../components/NewsGrid';
import Footer from '../components/Footer';

const ArticlesHero = () => {
  const { t } = useTranslations();

  return (
    <main className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
          <span className="text-primary">{t('articles.title')}</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          {t('articles.subtitle')}
        </p>
      </div>
    </main>
  );
};

export default function Articles() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{`${t('siteName')} - ${t('articles.pageTitle')}`}</title>
        <meta name="description" content={t('articles.description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ArticlesHero />
      <SearchSection showFilterButton={false} />
      <NewsGrid />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
