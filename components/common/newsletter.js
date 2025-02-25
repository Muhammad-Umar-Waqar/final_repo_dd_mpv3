import { useTranslations } from '../../utils/i18n';


const NewsletterSection = () => {

    const { t } = useTranslations();
    return (
        <section className="mb-8 sm:mb-16 max-w-4xl bg-secondary/5 text-foreground mx-auto px-4 sm:px-6 py-8 sm:py-16 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">{t('research.newsletter.title')}</h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8">
                {t('research.newsletter.description')}
            </p>
            <div className="max-w-2xl mx-auto">
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <input
                        type="email"
                        placeholder={t('research.newsletter.emailPlaceholder')}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3  rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 sm:px-8 py-2 sm:py-3 bg-primary text-primary-foreground  rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        {t('research.newsletter.subscribeButton')}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default NewsletterSection;
