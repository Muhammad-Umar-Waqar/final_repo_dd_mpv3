import Head from 'next/head';
import { useTranslations } from '../utils/i18n';
import Link from 'next/link';

export default function Custom404() {
  const { t } = useTranslations();

  return (
    <div className="min-h-96 bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Head>
        <title>{t('notFound.metaTitle')}</title>
        <meta name="description" content={t('notFound.metaDescription')} />
        <link rel="icon" href="/dd_favicon.jpg" />
      </Head>

      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">
          {t('notFound.title')}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-lg mx-auto">
          {t('notFound.description')}
        </p>
        <div className="mt-8">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {t('notFound.homeButton')}
          </Link>
        </div>
      </div>
    </div>
  );
} 