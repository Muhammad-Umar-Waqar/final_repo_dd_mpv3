import Head from 'next/head';
import InterventionsPage from '../components/InterventionsPage';

export default function Interventions() {
  return (
    <>
      <Head>
        <title>Interventions Analysis - deDiabetes</title>
        <meta name="description" content="Analysis of diabetes interventions, their outcomes, effectiveness, and potential bias" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <InterventionsPage />
    </>
  );
}