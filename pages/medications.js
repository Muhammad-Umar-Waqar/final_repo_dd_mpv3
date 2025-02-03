import Head from 'next/head';
import MedicationsPage from '../components/MedicationsPage';

export default function Medications() {
  return (
    <>
      <Head>
        <title>Medications Analysis - deDiabetes</title>
        <meta name="description" content="Analysis of diabetes medications and their outcomes, effectiveness, and potential bias" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <MedicationsPage />
    </>
  );
}