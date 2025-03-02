import Footer from '../components/Footer';
import { useTranslations } from '../utils/i18n';

const PrivacyPage = () => {
  const { t } = useTranslations();

  return (
    <>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {t('privacy.title')}
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">{t('privacy.lastUpdated')}</p>

        {/* Introduction Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacy.sections.introduction.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('privacy.sections.introduction.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Information We Collect Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacy.sections.infoCollect.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('privacy.sections.infoCollect.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
            
            {/* Personal Information Subsection */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">{t('privacy.sections.infoCollect.subsections.personal.title')}</h3>
              <ul className="list-disc pl-8 mb-2">
                {t('privacy.sections.infoCollect.subsections.personal.content').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{t('privacy.sections.infoCollect.subsections.personal.additional')}</p>
            </div>
            
            {/* Non-Personal Information Subsection */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">{t('privacy.sections.infoCollect.subsections.nonPersonal.title')}</h3>
              <ul className="list-disc pl-8 mb-2">
                {t('privacy.sections.infoCollect.subsections.nonPersonal.content').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{t('privacy.sections.infoCollect.subsections.nonPersonal.additional')}</p>
            </div>
          </div>
        </section>

        {/* Cookies and Tracking Technologies Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacy.sections.cookies.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('privacy.sections.cookies.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Payment Processing Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacy.sections.payment.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('privacy.sections.payment.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* How We Use Your Information Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacy.sections.infoUse.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('privacy.sections.infoUse.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
            <ul className="list-disc pl-8 mt-2 mb-4">
              {t('privacy.sections.infoUse.listItems').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{t('privacy.sections.infoUse.additional')}</p>
          </div>
        </section>

        {/* Data Sharing and Disclosure Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacy.sections.dataSharing.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('privacy.sections.dataSharing.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
            <ul className="list-disc pl-8 mt-2">
              {t('privacy.sections.dataSharing.listItems').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Data Security Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacy.sections.dataSecurity.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('privacy.sections.dataSecurity.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Your Rights and Choices Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacy.sections.rights.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('privacy.sections.rights.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Changes to This Privacy Policy Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacy.sections.changes.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('privacy.sections.changes.content').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacy.sections.contact.title')}</h2>
          <div className="text-lg leading-relaxed text-foreground">
            {t('privacy.sections.contact.content').map((paragraph, index) => (
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

export default PrivacyPage;
