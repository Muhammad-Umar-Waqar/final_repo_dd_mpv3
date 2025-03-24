// pages/membership-premium.js
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { IconCheck, IconCircleCheck } from '@tabler/icons-react';
import Footer from '../components/Footer';
import { useTranslations } from '../utils/i18n';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Skeleton } from '@mui/material';

export default function MembershipPremium() {
  const { t } = useTranslations();
  const { data: session, update, status } = useSession();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  
  const router = useRouter();
  // Premium features list using translations
  const premiumFeatures = [
    { name: t('premium.features.advancedSearch'), included: true },
    { name: t('premium.features.darkMode'), included: true },
    { name: t('premium.features.expandedResearch'), included: true },
    { name: t('premium.features.effectivenessScore'), included: true },
    { name: t('premium.features.biasAnalysis'), included: true },
  ];

  // Check if user is subscribed
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    
    if (session?.user?.role === 'premium') {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [session]);



  // // Handle cancel subscription
  // const handleCancelSubscription = async () => {
   
  //   if (!session) {
  //     setMessage("You must be logged in to unsubscribed!.");
  //     router.push('/login');
  //   }
    

  //   setLoading(true);
  //   setMessage("");

  //   try {
  //     const res = await fetch("/api/unsubscribe", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ newRole: "basic" }),
  //     });

  //     const data = await res.json();

  //     if (res.ok && data.refreshSession) {
  //       setMessage("User Unsubscribed!");
  //       await update({
  //         ...session,
  //         user: {
  //           ...session?.user,
  //           role: "basic" 
  //         }
  //       }
  //     );
      
         
  //     setIsSubscribed(false);
      
  //     router.reload();

  //     } else {
  //       setMessage(data.error || "Something went wrong.");
  //     }
  //   } catch (error) {
  //     // console.error("Error:", error);
  //     setMessage("An error occurred.");
  //   }

  //   setLoading(false);

  // };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{t('membership.title')} - deDiabetes</title>
        <meta name="description" content={t('membership.description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            {t('membership.label')}
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('membership.heading')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('membership.subtitle')}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Membership Status Section */}
          <div className="border border-border rounded-lg p-8 bg-background">
            <h2 className="text-xl font-bold mb-2">{t('membership.status.title')}</h2>
            <p className="text-muted-foreground text-sm mb-8">{t('membership.status.subtitle')}</p>
            
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <IconCircleCheck className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('membership.status.active')}</h3>
              <p className="text-center text-muted-foreground">
                {t('membership.status.activeDescription')}
              </p>
            </div>
          </div>

          {/* Subscription Details Section */}
          <div className="border border-border rounded-lg p-8 bg-background">
            <h2 className="text-xl font-bold mb-2">{t('membership.details.title')}</h2>
            <p className="text-muted-foreground text-sm mb-6">{t('membership.details.subtitle')}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">{t('membership.details.featuresIntro')}</h3>
              
              <div className="space-y-4">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <IconCheck className="w-5 h-5 text-green-500" />
                    <span>{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
            {(loading || status === "loading") ? (
  // MUI Skeleton for button
  <Skeleton variant="rectangular" width="100%" height={48} />
) :
(
  (isSubscribed || session?.user?.role === "admin") && (
    <button disabled={(status == "loading") || !isSubscribed || session?.user?.role === "admin" }  className={`w-full py-3 border border-gray-300 text-gray-700 rounded-md transition-colors cursor-not-allowed opacity-50`}>
      {t("membership.subscribed")}
    </button>
  )
)
}
                  {/* <button
        onClick={handleCancelSubscription}
        disabled={loading || !isSubscribed || session.user.role == "admin"}
        className={`w-full py-3 border border-gray-300 text-gray-700 rounded-md transition-colors ${
          loading ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50"
        }`}
      >
        {loading
          ? "Processing..."
          : isSubscribed || session?.user?.role == "admin" ? t('membership.cancelButton') : t('membership.unsubscribed')}
      </button> */}

          </div>
        </div>

        {/* Return to Home Link */}
        <div className="text-center mt-16">
          <Link href="/" className="text-red-600 text-xl hover:underline">
            {t('membership.returnHome')}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
