// pages/index.js
import Head from 'next/head';
import { useTranslations } from '../utils/i18n';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import SearchSection from '../components/SearchSection';
import NewsGrid from '../components/NewsGrid';
import Footer from '../components/Footer';

export default function Home() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{`${t('siteName')} - ${t('homeTitle')}`}</title>
        <meta name="description" content={t('homeDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <IntroSection />
      <SearchSection />
      <NewsGrid />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}