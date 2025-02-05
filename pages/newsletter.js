import Head from 'next/head';
import Footer from '../components/Footer';
import { useTranslations } from '../utils/i18n';

export default function Newsletter() {
  const { t } = useTranslations();

  const CheckIcon = () => (
    <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>{t('newsletter.title')}</title>
        <meta name="description" content={t('newsletter.description')} />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('newsletter.heading')}
          </h1>
          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
            {t('newsletter.subheading')}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            {t('newsletter.mainText')}
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mb-8 shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              {t('newsletter.benefitsTitle')}
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckIcon />
                <span className="text-gray-700 dark:text-gray-300">
                  {t('newsletter.benefits.research')}
                </span>
              </li>
              <li className="flex items-start">
                <CheckIcon />
                <span className="text-gray-700 dark:text-gray-300">
                  {t('newsletter.benefits.aiAnalysis')}
                </span>
              </li>
              <li className="flex items-start">
                <CheckIcon />
                <span className="text-gray-700 dark:text-gray-300">
                  {t('newsletter.benefits.facts')}
                </span>
              </li>
              <li className="flex items-start">
                <CheckIcon />
                <span className="text-gray-700 dark:text-gray-300">
                  {t('newsletter.benefits.privacy')}
                </span>
              </li>
            </ul>
          </div>

          <p className="text-lg font-medium text-center mb-8 text-gray-700 dark:text-gray-300">
            {t('newsletter.noSpam')}
          </p>

          <div className="text-center">
            <form className="max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('newsletter.emailPlaceholder')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <span className="inline-block w-4 h-4 mr-2">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                </span>
                {t('newsletter.subscribeButton')}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}