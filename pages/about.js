import { useTranslations } from '../utils/i18n';

const AboutPage = () => {
  const { t } = useTranslations();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {t('aboutUs.title')}
      </h1>

      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {t('aboutUs.mission.title')}
        </h2>
        <p className="text-lg leading-relaxed text-foreground">
          {t('aboutUs.mission.content')}
        </p>
      </section>

      {/* Vision Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {t('aboutUs.vision.title')}
        </h2>
        <p className="text-lg leading-relaxed text-foreground">
          {t('aboutUs.vision.content')}
        </p>
      </section>

      {/* Approach Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {t('aboutUs.approach.title')}
        </h2>
        <p className="text-lg leading-relaxed text-foreground">
          {t('aboutUs.approach.content')}
        </p>
      </section>

      {/* Values Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-primary">
          {t('aboutUs.values.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t('aboutUs.values.items').map((value, index) => (
            <div
              key={index}
              className="bg-secondary/5 p-6 rounded-lg border border-border"
            >
              <h3 className="text-xl font-semibold mb-2 text-primary">
                {value.title}
              </h3>
              <p className="text-foreground/80">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {t('aboutUs.team.title')}
        </h2>
        <p className="text-lg leading-relaxed text-foreground">
          {t('aboutUs.team.content')}
        </p>
      </section>

      {/* Contact Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {t('aboutUs.contact.title')}
        </h2>
        <p className="text-lg leading-relaxed text-foreground">
          {t('aboutUs.contact.content')}
        </p>
      </section>
    </div>
  );
};

export default AboutPage;