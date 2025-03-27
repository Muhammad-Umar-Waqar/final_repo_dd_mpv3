// pages/premium.js
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { IconCrown, IconCheck, IconBackground } from '@tabler/icons-react';
import Footer from '../components/Footer';
import { useTranslations } from '../utils/i18n';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
// import PayPalCheckout from '../components/PayPalCheckout';
import CheckoutModal from '../components/PayPalCheckOutDialog';


export default function Premium() {
  const [billingCycle, setBillingCycle] = useState('yearly');
  const { t } = useTranslations();
  const [selectedPlan, setSelectedPlan] = useState("1month"); 
  
  const [isSubscribed, setIsSubscribed] = useState(false);

  const basicFeatures = [
    { name: t('premium.features.zeroAds'), included: true },
    { name: t('premium.features.noTracking'), included: true },
    { name: t('premium.features.bookmarkContent'), included: true },
    { name: t('premium.features.newsSummaries'), included: true },
    { name: t('premium.features.curatedContent'), included: true },
  ];

  const premiumFeatures = [
    { name: t('premium.features.advancedSearch'), included: true },
    { name: t('premium.features.darkMode'), included: true },
    { name: t('premium.features.expandedResearch'), included: true },
    { name: t('premium.features.effectivenessScore'), included: true },
    { name: t('premium.features.biasAnalysis'), included: true },
  ];

  const monthlyPrice = 5;
  // const yearlyDiscount = 0.25;
  const yearlyPrice = 15;


  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  

  const router = useRouter();




  const handleSubscribe = () => {
    if (!session) {
      router.push('/login');
      return;
    }
    // Optionally set selected plan here based on your UI logic:
    setSelectedPlan(billingCycle === 'yearly' ? "4months" : "1month");
    // Open the checkout modal
    setModalOpen(true);
  };

useEffect(() => {
  if (session?.user?.role === 'premium') {
    setIsSubscribed(true);
  } else {
    setIsSubscribed(false);
  }
}, [session]);

console.log("Client ID:", process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);


  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{`${t('premium.title')} - deDiabetes`}</title>
        <meta name="description" content={t('premium.description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('premium.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            {t('premium.subtitle')}
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('premium.description')}
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-secondary/10 rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('premium.billing.monthly')}
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('premium.billing.yearly')}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="border border-border rounded-lg p-8 bg-background">
            <div className="flex items-center gap-2 mb-4">
              <IconBackground className="w-6 h-6" />
              <h2 className="text-2xl font-bold">{t('premium.basic.title')}</h2>
            </div>
            <p className="text-muted-foreground mb-4">{t('premium.basic.subtitle')}</p>
            <div className="mb-8">
              <span className="text-4xl font-bold">{t('premium.billing.free')}</span>
            </div>
            <div className="space-y-4 mb-8">
              <p className="font-medium">{t('premium.basic.includes')}</p>
              {basicFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-primary rounded-lg p-8 bg-background relative">
            {
               billingCycle === 'yearly' && <div className="absolute -top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm">
                {t('premium.billing.yearlyDiscount')} 
                </div>
                 }
            
           
            <div className="flex items-center gap-2 mb-4">
              <IconCrown className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">{t('premium.premium.title')}</h2>
            </div>
            <p className="text-muted-foreground mb-4">{t('premium.premium.subtitle')}</p>
            <div className="mb-8">
              <span className="text-4xl font-bold">
                ${billingCycle === 'yearly' ? yearlyPrice : monthlyPrice}
              </span>
              <span className="text-muted-foreground">{t('premium.billing.month')}</span>
              <p className="text-sm text-muted-foreground">
                {billingCycle === 'yearly' 
                  ? t('premium.billing.billedYearly')
                  : t('premium.billing.billedMonthly')}
              </p>
            </div>
            <div className="space-y-4 mb-8">
              <p className="font-medium">{t('premium.premium.includes')}</p>
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
                <button
      className={`w-full py-3 ${
        !session ? "bg-gray-400" : // Disable before session loads
        isSubscribed || session?.user?.role === "admin"
          ? "bg-gray-400 cursor-not-allowed" // Disable for admins and subscribed users
          : "bg-primary hover:bg-primary/90 transition-colors"
      } text-white rounded-md`}
      // onClick={() => setSelectedPlan( billingCycle === 'monthly' ? "1month" : "4months" )}
      onClick={handleSubscribe}
      disabled={loading || isSubscribed || session?.user?.role === "admin"}
    >
      {loading
        ? "Upgrading..."
        : isSubscribed
          ? t('premium.premium.subscribed')
          : t('premium.premium.subscribeButton')}
    </button>


          </div>
        </div>
      </main>
      <CheckoutModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        productType={selectedPlan}
      />
      <Footer />
    </div>
  );
}