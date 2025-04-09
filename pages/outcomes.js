import Head from 'next/head';
import OutcomesPage from '../components/OutcomesPage';
import { useTranslations } from '../utils/i18n';
import { getOutcomesTable } from '../db/research';

export default function Outcomes({ outcomesData }) {
  const { t } = useTranslations();
  
  return (
    <>
      <Head>
        <title>{`${t('outcomes.title')} - deDiabetes`}</title>
        <meta 
          name="description" 
          content={t('outcomes.description')} 
        />
        <link rel="icon" href="/dd_favicon.jpg" />
      </Head>
      
      <OutcomesPage outcomesData={outcomesData} />
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
    const outcomesData = await getOutcomesTable(dbLocale);

    return {
      props: {
        outcomesData
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching outcomes data:', error);
    return {
      props: {
        outcomesData: []
      },
      revalidate: 3600
    };
  }
}