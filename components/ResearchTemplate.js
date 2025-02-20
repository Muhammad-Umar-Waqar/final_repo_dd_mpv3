import React, { useState } from 'react';
import { IconChevronUp, IconPhoto, IconFileTextAi } from '@tabler/icons-react';


import { useTranslations } from '../utils/i18n';

import DiscussionsSection from './DiscussionsSection';
import RelatedPosts from './RelatedPosts';
import BlogPostHeader from './BlogPostHeader';
import Footer from './Footer';

const ResearchTemplate = ({
  title = "Understanding Artificial Pancreas Systems: Results from a 24-Month Trial",
  author = "Dr. Sarah Johnson",
  publisher = "Diabetes Research Journal",
  publishDate = "January 31, 2025",
  domain,
  readTime = "8 min read",
  headerImage,
  summary = "",
  studyDesign = {
    interventions: [],
    outcomes: [],
    studyType: "",
    duration: "",
    size: ""
  },
  studyPopulation = {
    ageRange: "",
    sex: "",
    geography: [],
    others: []
  },
  methodology = "",
  interventions = "",
  keyFindings = "",
  comparison = "",
  biasScore = "",
  effectivenessAnalysis = [{
    intervention: [],
    items: []
  }],
  journalReference = {
    full: ""
  },
  expertCards = [],
  onlineCards = [],
  redditCards = [],
  studyCards = [],
  xCards = [],
  youtubeCards = [],
  relatedPosts = [],
  domains = []
}) => {

  const { t, locale } = useTranslations();

  const [showBackToTop, setShowBackToTop] = useState(false);

  // Funciones auxiliares para formatear las claves de traducción
  const formatKey = (value, prefix) => {
    return value.toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/\(|\)/g, '')
      .replace(/[–-]/g, '–');  // Normaliza los guiones
  };

  const translateValue = (value, type) => {
    if (!value) return '';
    const key = formatKey(value, type);
    console.log(key);
    return t(`research.${type}.${key}`) || value;
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
        >
          <IconChevronUp className="w-6 h-6" />
        </button>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Tags */}
        {domains && domains.length > 0 && (
          <div className="flex gap-2 mb-6">
            {domains.map((domain, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 text-sm font-medium text-red-700 bg-red-50 rounded-md"
              >
                {domain}
              </span>
            ))}
          </div>
        )}
        <BlogPostHeader
          title={title}
          publisher={publisher}
          publishDate={publishDate}
          readTime={readTime}
        />

        {headerImage ? (
          <figure className="mb-16">
            <img
              src={headerImage}
              alt={title}
              className="w-full aspect-video object-cover rounded-lg"
            />
          </figure>
        ) : (
          <figure className="mb-16">
            <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
              <IconPhoto className="w-12 h-12 text-muted-foreground" />
            </div>
          </figure>
        )}

        {summary && (
          <section className="prose prose-lg max-w-none mb-16">
            <h2 className="mb-6">{t('research.sections.summary')}</h2>
            <p>{summary}</p>
          </section>
        )}

        {(studyDesign.interventions.length > 0 ||
          studyDesign.outcomes.length > 0 ||
          studyDesign.studyType.length > 0 ||
          studyDesign.duration.length > 0 ||
          studyDesign.size.length > 0) && (
            <section className="prose prose-lg max-w-none mb-16">
              <h2 className="mb-6">{t('research.sections.studyDesign')}</h2>
              <div className="bg-secondary/5 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studyDesign.interventions.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">{t('research.sections.interventions')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {studyDesign.interventions.map((intervention, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {intervention}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {studyDesign.studyType.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">{t('research.sections.studyType')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {studyDesign.studyType.map((type, index) => (
                          <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {studyDesign.outcomes.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">{t('research.sections.outcomes')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {studyDesign.outcomes.map((outcome, index) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {outcome}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(studyDesign.duration.length > 0 || studyDesign.size.length > 0) && (
                    <div>
                      <h3 className="font-medium mb-2">{t('research.sections.durationSize')}</h3>
                      {studyDesign.duration.map((duration, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm mr-2">
                          {translateValue(duration, 'duration')}
                        </span>
                      ))}
                      {studyDesign.size.map((size, index) => (
                        <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                          {translateValue(size, 'size')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

        {(studyPopulation.ageRange.length > 0 ||
          studyPopulation.sex.length > 0 ||
          studyPopulation.geography.length > 0 ||
          studyPopulation.others.length > 0) && (
            <section className="prose prose-lg max-w-none mb-16">
              <h2 className="mb-6">{t('research.sections.studyPopulation')}</h2>
              <div className="bg-secondary/5 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studyPopulation.ageRange.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">{t('research.sections.ageRange')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {studyPopulation.ageRange.map((age, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {translateValue(age, 'ageRange')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {studyPopulation.sex.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">{t('research.sections.sex')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {studyPopulation.sex.map((sex, index) => (
                          <span key={index} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                            {translateValue(sex, 'sex')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {studyPopulation.geography.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">{t('research.sections.geography')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {studyPopulation.geography.map((location, index) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {studyPopulation.others.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">{t('research.sections.otherCriteria')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {studyPopulation.others.map((criterion, index) => (
                          <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                            {criterion}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

        <section className="prose prose-lg max-w-none mb-16">
          {methodology.length > 0 && (
            <section>
              <h2>{t('research.sections.methodology')}</h2>
              {methodology.map((method, index) => (
                <p key={index}>{method}</p>
              ))}
            </section>
          )}

          {interventions.length > 0 && (
            <section>
              <h2>{t('research.sections.interventions')}</h2>
              {interventions.map((intervention, index) => (
                <p key={index}>{intervention}</p>
              ))}
            </section>
          )}

          {keyFindings.length > 0 && (
            <section>
              <h2>{t('research.sections.keyFindings')}</h2>
              {keyFindings.map((finding, index) => (
                <p key={index}>{finding}</p>
              ))}
            </section>
          )}

          {comparison.length > 0 && (
            <section>
              <h2>{t('research.sections.comparison')}</h2>
              {comparison.map((comp, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: comp }} />
              ))}
            </section>
          )}
        </section>

        {biasScore && (
          <section>
            <div className="max-w-2xl mx-auto">
              <div className="bg-secondary/5 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4 justify-center">
                  <IconFileTextAi className="w-6 h-6" />
                  <h2 className="text-xl font-bold">{t('research.sections.biasAnalysisScore')}</h2>
                </div>
                <div className="flex justify-center">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    {biasScore}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {effectivenessAnalysis.length > 0 && (
          <section className="prose prose-lg max-w-none mb-16">
            <section>
              <div className="flex mb-4">
                <h2>{t('research.sections.effectivenessAnalysis')}</h2>
              </div>
              <div className='flex flex-col gap-4'>
                {effectivenessAnalysis.map((analysis, index) => (
                  <div key={index} className="space-y-5 bg-secondary/5 rounded-lg p-6">
                    {analysis.intervention.length > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t('research.sections.intervention')}:</span>
                        <div className="flex flex-wrap gap-2 justify-end">
                          {analysis.intervention.map((int, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {int}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {analysis.items.length > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t('research.sections.effectiveness')}:</span>
                        <div className="flex flex-wrap gap-2 justify-end">
                          {analysis.items.map((item, idx) => (
                            <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                              {t(`research.sections.effectivenessOptions.${item.effectiveness.toLowerCase()}`)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </section>
        )}

        {journalReference.length > 0 && (
          <section className="prose prose-lg max-w-none mb-16">
            <section>
              <h2>{t('research.sections.journalReference')}</h2>
              {journalReference.map((ref, index) => (
                <p key={index} className="italic" dangerouslySetInnerHTML={{ __html: ref }} />
              ))}
            </section>
          </section>
        )}

        {(expertCards.length > 0 ||
          onlineCards.length > 0 ||
          redditCards.length > 0 ||
          studyCards.length > 0 ||
          xCards.length > 0 ||
          youtubeCards.length > 0) && (
            <DiscussionsSection
              expertCards={expertCards}
              onlineCards={onlineCards}
              redditCards={redditCards}
              studyCards={studyCards}
              xCards={xCards}
              youtubeCards={youtubeCards}
            />
          )}

        <section className="mb-16 max-w-4xl bg-gray-50 mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('research.newsletter.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('research.newsletter.description')}
          </p>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder={t('research.newsletter.emailPlaceholder')}
                className="flex-1 px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {t('research.newsletter.subscribeButton')}
              </button>
            </form>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )}
      </main>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ResearchTemplate;