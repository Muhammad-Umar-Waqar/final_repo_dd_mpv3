// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import { useTranslations } from '../utils/i18n';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import SearchSection from '../components/SearchSection';
import NewsGrid from '../components/NewsGrid';
import Footer from '../components/Footer';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t } = useTranslations();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{`${t('siteName')} - ${t('homeTitle')}`}</title>
        <meta name="description" content={t('homeDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
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