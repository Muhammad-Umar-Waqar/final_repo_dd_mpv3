import Head from 'next/head';
import InterventionsPage from '../components/InterventionsPage';
import { useTranslations } from '../utils/i18n';

export default function Interventions() {
  const { t } = useTranslations();
  
  return (
    <>
      <Head>
        <title>{t('interventions.title')} - deDiabetes</title>
        <meta 
          name="description" 
          content={t('interventions.filterPlaceholder')} 
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <InterventionsPage />
    </>
  );
}