import Head from 'next/head';
import MedicationsPage from '../components/MedicationsPage';
import { useTranslations } from '../utils/i18n';
import { getMedicationsTable } from '../db/research';

export default function Medications({ medicationsData }) {
  const { t } = useTranslations();
  
  return (
    <>
      <Head>
        <title>{`${t('medications.title')} - deDiabetes`}</title>
        <meta 
          name="description" 
          content={t('medications.description')} 
        />
        <link rel="icon" href="/dd_favicon.jpg" />
      </Head>
      
      <MedicationsPage medicationsData={medicationsData} />
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
    const medicationsData = await getMedicationsTable(dbLocale);

    return {
      props: {
        medicationsData
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching medications data:', error);
    return {
      props: {
        medicationsData: []
      },
      revalidate: 3600
    };
  }
} 