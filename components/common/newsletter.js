import { useTranslations } from '../../utils/i18n';
import { useState } from 'react';



const NewsletterSection = () => {
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
    
      setMessage(t("hero.subscriptionError")); // Use translation for generic error
    } finally{
      setLoading(false);
      setEmail("");
    }
    
  };





    return (
        <section className="mb-8 sm:mb-16 max-w-4xl bg-secondary/5 text-foreground mx-auto px-4 sm:px-6 py-8 sm:py-16 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">{t('research.newsletter.title')}</h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8">
                {t('research.newsletter.description')}
            </p>
            <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubscription}  className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <input
                        type="email"
                        placeholder={t('research.newsletter.emailPlaceholder')}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3  rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none dark:focus:ring-0 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 sm:px-8 py-2 sm:py-3 bg-primary text-primary-foreground  rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2  focus:ring-primary focus:ring-offset-2  disabled:bg-red-700  disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {t('research.newsletter.subscribeButton')}
                    </button>
                    {/* Display API response message */}
                </form>
          {message && <p className='mt-4 text-center text-lg font-semibold text-green-600'>{message}</p>}
            </div>
        </section>
    )
}

export default NewsletterSection;
