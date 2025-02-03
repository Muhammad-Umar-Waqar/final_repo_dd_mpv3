// pages/premium.js
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { IconCrown, IconCheck,IconBackground } from '@tabler/icons-react';
import Footer from '../components/Footer';

export default function Premium() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [billingCycle, setBillingCycle] = useState('yearly'); // yearly or monthly

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const basicFeatures = [
    { name: 'Zero Advertisement', included: true },
    { name: 'No tracking', included: true },
    { name: 'Bookmark content', included: true },
    { name: 'Research news summaries', included: true },
    { name: 'Related curated online content', included: true },
  ];

  const premiumFeatures = [
    { name: 'Advanced search and filter functionality', included: true },
    { name: 'Dark mode', included: true },
    { name: 'Expanded research information', included: true },
    { name: 'Interventions effectiveness score', included: true },
    { name: 'Bias analysis using applicable Cochrane Collaboration tools', included: true },
  ];

  const monthlyPrice = 3.0;
  const yearlyDiscount = 0.25; // 25% discount
  const yearlyPrice = monthlyPrice * 12 * (1 - yearlyDiscount);

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Premium Membership - deDiabetes</title>
        <meta name="description" content="Upgrade to Premium - Access advanced features and comprehensive diabetes research" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Easy, smart, and always the right choice
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One plan for full access and advanced search, empowering evidence-based diabetes care
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
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="border border-border rounded-lg p-8 bg-background">
            <div className="flex items-center gap-2 mb-4">
              <IconBackground className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Basic</h2>
            </div>
            <p className="text-muted-foreground mb-4">A clean experience</p>
            <div className="mb-8">
              <span className="text-4xl font-bold">Free</span>
            </div>
            <div className="space-y-4 mb-8">
              <p className="font-medium">Basic includes...</p>
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
            <div className="absolute -top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm">
              Yearly -25%
            </div>
            <div className="flex items-center gap-2 mb-4">
              <IconCrown className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Premium</h2>
            </div>
            <p className="text-muted-foreground mb-4">Full features</p>
            <div className="mb-8">
              <span className="text-4xl font-bold">
                ${billingCycle === 'yearly' ? (yearlyPrice / 12).toFixed(2) : monthlyPrice.toFixed(2)}
              </span>
              <span className="text-muted-foreground">/month</span>
              <p className="text-sm text-muted-foreground">
                (billed {billingCycle === 'yearly' ? 'yearly' : 'monthly'})
              </p>
            </div>
            <div className="space-y-4 mb-8">
              <p className="font-medium">Everything in Basic plus...</p>
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
            <button
              className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Subscribe and pay
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}