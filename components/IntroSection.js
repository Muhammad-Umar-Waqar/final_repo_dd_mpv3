// components/IntroSection.js
import { useTranslations } from '../utils/i18n';

const IntroSection = () => {
    const { t } = useTranslations();

    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-8">
            {t('introSection.headline')}
          </h2>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto">
            {t('introSection.subheadline')}
          </p>
        </div>
      </section>
    );
  };
  
  export default IntroSection;