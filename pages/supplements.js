import Head from 'next/head';
import SupplementsPage from '../components/SupplementsPage';

export default function Supplements() {
  return (
    <>
      <Head>
        <title>Supplements Analysis - deDiabetes</title>
        <meta name="description" content="Analysis of diabetes supplements and their outcomes, effectiveness, and potential bias" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <SupplementsPage />
    </>
  );
}