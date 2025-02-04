import Head from 'next/head';
import OutcomesPage from '../components/OutcomesPage';
import { useTranslations } from '../utils/i18n';

export default function Outcomes() {
  return (
    <>
      <Head>
        <title>Outcomes Analysis - deDiabetes</title>
        <meta name="description" content="Analysis of diabetes outcomes and their related interventions, effectiveness, and potential bias" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <OutcomesPage />
    </>
  );
}