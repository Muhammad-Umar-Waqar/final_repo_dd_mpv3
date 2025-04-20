import Head from 'next/head';
import { useTranslations } from '../utils/i18n';
import { getAllResearchStudies } from '../db/research';
import { filterResearchStudies } from '../lib/research/research-filter';
import { useRouter } from 'next/router';
import ResearchPage from '../components/research/ResearchPage';

export default function Research({ allStudies }) {
  const { t } = useTranslations();
  const router = useRouter();
  const { type, item, outcome } = router.query;

  // Filter studies based on query params
  const filteredStudies = filterResearchStudies(allStudies, type, item, outcome);

  // If there are no filtered studies, show message or redirect
  if (!filteredStudies || filteredStudies.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">{t('researchTable.noStudiesFound')}</h1>
        <p>{t('researchTable.tryDifferentSearch')}</p>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>{`${item} - ${outcome} | ${t('researchTable.title')} - deDiabetes`}</title>
        <meta 
          name="description" 
          content={`${t('researchTable.studies')} ${item} ${t('researchTable.for')} ${outcome}`}
        />
        <link rel="icon" href="/dd_favicon.png" />
      </Head>
      
      <ResearchPage 
        studies={filteredStudies}
        type={type}
        mainItem={item}
        outcome={outcome}
      />
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
    
    // Get all studies
    const allStudies = await getAllResearchStudies(dbLocale);

    return {
      props: {
        allStudies
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching research data:', error);
    return {
      props: {
        allStudies: []
      },
      revalidate: 3600
    };
  }
}
