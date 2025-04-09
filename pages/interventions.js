import Head from 'next/head';
import InterventionsPage from '../components/InterventionsPage';
import { useTranslations } from '../utils/i18n';
import { getInterventionsTable } from '../db/research';

export default function Interventions({ interventionsData }) {
  const { t } = useTranslations();
  
  return (
    <>
      <Head>
        <title>{`${t('interventions.title')} - deDiabetes`}</title>
        <meta 
          name="description" 
          content={t('interventions.description')} 
        />
        <link rel="icon" href="/dd_favicon.jpg" />
      </Head>
      
      <InterventionsPage interventionsData={interventionsData} />
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
    const interventionsData = await getInterventionsTable(dbLocale);

    return {
      props: {
        interventionsData
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching interventions data');
    return {
      props: {
        interventionsData: []
      },
      revalidate: 3600
    };
  }
}

