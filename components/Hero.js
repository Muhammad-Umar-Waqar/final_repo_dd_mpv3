// components/Hero.js
import { useState } from 'react';
import { useTranslations } from '../utils/i18n';

const Hero = () => {
  const { t, locale } = useTranslations();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const translations = {
    id: locale === 'es' ? 'vhwnC6KsYb7PrrdSBzy27g' : 'tGZBa7H0o0LBIiXAyf2lxw',
  };

  const listId = translations.id;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubscription = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setMessage(t("hero.invalidEmail")); // Use translation for invalid email
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/opt-in-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, listId, locale }),

      });

      const data = await response.json();
      
      
      setMessage(data.message); // Use message from API response
    } catch (error) {
      console.error("Error in Subscription", error);
      setMessage(t("hero.subscriptionError")); // Use translation for generic error
    } finally{
      setLoading(false);
      setEmail("");
    }
    
  };

  return (
    <main className="w-full dark:bg-transparent bg-gray-50">
      <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
          <span className="text-primary">{t('hero.stayInformed')}</span>{' '}
          <span className="text-primary">{t('hero.stayAhead')}</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          {t('hero.subtitle')}
        </p>

        {/* Subscription Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubscription} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder={t('hero.emailPlaceholder')}
              className="flex-1 px-4 py-3  rounded-md dark:bg-transparent dark:focus:ring-0 dark:text-white-800 border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-red-700  disabled:cursor-not-allowed"
              disabled={loading}
            >
              {t('hero.subscribeButton')}
            </button>
          </form>
          
          {/* Display API response message */}
          {message && <p className='mt-4 text-center text-lg font-semibold text-green-600'>{message}</p>}

          <p className="mt-4 text-sm text-muted-foreground">
            {t('hero.privacyNote')}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Hero;
