import Footer from '../components/Footer';
import { useTranslations } from '../utils/i18n';

const TermsPage = () => {
  const { t } = useTranslations();

  return (
    <>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {t('terms.title')}
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">{t('terms.lastUpdated')}</p>

        {/* Introduction Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('terms.sections.introduction.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('terms.sections.introduction.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* General Information Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('terms.sections.generalInfo.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('terms.sections.generalInfo.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Use of the Site Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('terms.sections.siteUse.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('terms.sections.siteUse.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
            <ul className="list-disc pl-8 mt-2">
              {t('terms.sections.siteUse.listItems').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Intellectual Property Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('terms.sections.intellectualProperty.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('terms.sections.intellectualProperty.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Medical Disclaimer Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('terms.sections.medicalDisclaimer.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('terms.sections.medicalDisclaimer.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Limitation of Liability Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('terms.sections.liability.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('terms.sections.liability.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
            <ul className="list-disc pl-8 mt-2">
              {t('terms.sections.liability.listItems').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* External Links Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('terms.sections.externalLinks.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('terms.sections.externalLinks.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Subscriptions Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('terms.sections.subscriptions.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('terms.sections.subscriptions.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Refunds Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('terms.sections.refunds.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('terms.sections.refunds.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
            <ul className="list-disc pl-8 mt-2">
              {t('terms.sections.refunds.listItems').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {t('terms.sections.refunds.additionalContent') && t('terms.sections.refunds.additionalContent').map((paragraph, index) => (
              <p key={index} className="mt-4">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Changes to the Terms Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('terms.sections.changes.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('terms.sections.changes.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Governing Law Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('terms.sections.governingLaw.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('terms.sections.governingLaw.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('terms.sections.contact.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('terms.sections.contact.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < paragraph.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermsPage;
