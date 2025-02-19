import React, { useState } from 'react';
import { IconBrandReddit, IconBrandX, IconBrandYoutube, IconUsers, IconWorld, IconClipboardList, IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';

// Base Card Component
const BaseDiscussionCard = ({ icon: Icon, type, title, author, outboundLink }) => {
  const { t } = useTranslations();
  return (
    <div className="bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5" />
          <span className="text-sm font-medium text-muted-foreground">{t(`research.discussions.types.${type}`)}</span>
        </div>
        <a 
          href={outboundLink} 
          target="_blank" 
          rel="nofollow noopener noreferrer" 
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <IconExternalLink className="w-5 h-5" />
        </a>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      
      <div className="text-sm text-muted-foreground">
        <span>{author}</span>
      </div>
    </div>
  );
};

// Specific Card Types
export const ExpertCard = (props) => (
  <BaseDiscussionCard {...props} icon={IconUsers} type="experts" />
);

export const OnlineCard = (props) => (
  <BaseDiscussionCard {...props} icon={IconWorld} type="online" />
);

export const RedditCard = (props) => (
  <BaseDiscussionCard {...props} icon={IconBrandReddit} type="reddit" />
);

export const StudyCard = (props) => (
  <BaseDiscussionCard {...props} icon={IconClipboardList} type="studies" />
);

export const XCard = (props) => (
  <BaseDiscussionCard {...props} icon={IconBrandX} type="x" />
);

export const YoutubeCard = (props) => (
  <BaseDiscussionCard {...props} icon={IconBrandYoutube} type="youtube" />
);

// Main Discussions Section Component
const DiscussionsSection = ({ 
  expertCards = [],
  onlineCards = [],
  redditCards = [],
  studyCards = [],
  xCards = [],
  youtubeCards = []
}) => {
  const { t } = useTranslations();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: t('research.discussions.tabs.all') },
    { id: 'experts', label: t('research.discussions.tabs.experts') },
    { id: 'online', label: t('research.discussions.tabs.online') },
    { id: 'reddit', label: t('research.discussions.tabs.reddit') },
    { id: 'studies', label: t('research.discussions.tabs.studies') },
    { id: 'x', label: t('research.discussions.tabs.x') },
    { id: 'youtube', label: t('research.discussions.tabs.youtube') }
  ];

  const getDisplayCards = () => {
    const allCardsWithTypes = {
      experts: expertCards.map((card, index) => ({ ...card, type: 'experts', index })),
      online: onlineCards.map((card, index) => ({ ...card, type: 'online', index })),
      reddit: redditCards.map((card, index) => ({ ...card, type: 'reddit', index })),
      studies: studyCards.map((card, index) => ({ ...card, type: 'studies', index })),
      x: xCards.map((card, index) => ({ ...card, type: 'x', index })),
      youtube: youtubeCards.map((card, index) => ({ ...card, type: 'youtube', index }))
    };

    return activeTab === 'all' 
      ? Object.values(allCardsWithTypes).flat()
      : allCardsWithTypes[activeTab] || [];
  };

  const renderCard = (card) => {
    const CardComponent = {
      experts: ExpertCard,
      online: OnlineCard,
      reddit: RedditCard,
      studies: StudyCard,
      x: XCard,
      youtube: YoutubeCard
    }[card.type];

    return CardComponent ? (
      <CardComponent 
        key={`${card.type}-${card.index}-${card.outboundLink}`}
        title={card.title}
        author={card.author}
        outboundLink={card.outboundLink}
      />
    ) : null;
  };

  return (
    <section className="prose prose-lg max-w-none mb-16">
      <h2 className="text-3xl font-bold mb-8">{t('research.discussions.title')}</h2>
      
      {/* Navigation Tabs */}
      <div className="border-b border-border mb-8">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 font-medium text-sm transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {getDisplayCards().map(renderCard)}
      </div>
    </section>
  );
};

export default DiscussionsSection;