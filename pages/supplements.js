import Head from 'next/head';
import SupplementsPage from '../components/SupplementsPage';
import { useTranslations } from '../utils/i18n';
import { getSupplementsTable } from '../db/research';

export default function Supplements({ supplementsData }) {
  const { t } = useTranslations();
  
  return (
    <>
      <Head>
        <title>{`${t('supplements.title')} - deDiabetes`}</title>
        <meta 
          name="description" 
          content={t('supplements.description')} 
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <SupplementsPage supplementsData={supplementsData} />
    </>
  );
}

export async function getStaticProps({ locale }) {
  try {
    // Map URL locales to database locales
    const databaseLocales = {
      'en': 'en-us',
      'es': 'es-es'
    };
    
    const dbLocale = databaseLocales[locale] || locale;
    const supplementsData = await getSupplementsTable(dbLocale);

    return {
      props: {
        supplementsData
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching supplements data:', error);
    return {
      props: {
        supplementsData: []
      },
      revalidate: 3600
    };
  }
}