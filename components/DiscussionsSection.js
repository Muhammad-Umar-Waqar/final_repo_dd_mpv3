import React, { useState } from 'react';
import { IconBrandReddit, IconBrandTwitter, IconBrandYoutube, IconUsers, IconWorld, IconClipboardList } from '@tabler/icons-react';

// Default discussion data
const defaultDiscussionData = {
  experts: [
    {
      title: 'Dr. Smith on Automated Insulin Delivery',
      content: 'Expert analysis of the latest developments in AID systems',
      date: '2h ago',
      author: 'Dr. Jane Smith'
    },
    {
      title: 'Endocrinologist Panel Discussion',
      content: 'Leading experts discuss trial outcomes',
      date: '1d ago',
      author: 'Diabetes Care Journal'
    }
  ],
  online: [
    {
      title: 'Community Discussion Thread',
      content: 'Patient experiences with the new system',
      date: '3h ago',
      author: 'DiabetesForum'
    },
    {
      title: 'Online Support Group',
      content: 'Users sharing their experiences',
      date: '5h ago',
      author: 'T1D Community'
    }
  ],
  reddit: [
    {
      title: 'r/diabetes Discussion',
      content: 'User experiences and questions thread',
      date: '4h ago',
      author: 'r/diabetes'
    },
    {
      title: 'AMA with Trial Participant',
      content: 'First-hand experience sharing',
      date: '1d ago',
      author: 'r/T1D'
    }
  ],
  studies: [
    {
      title: 'Related Clinical Trial Results',
      content: 'Comparative analysis with similar studies',
      date: '1d ago',
      author: 'Clinical Trials Database'
    },
    {
      title: 'Meta-analysis Publication',
      content: 'Comprehensive review of AID systems',
      date: '2d ago',
      author: 'Diabetes Research'
    }
  ],
  x: [
    {
      title: 'Trending Discussion',
      content: 'Community reactions and insights',
      date: '1h ago',
      author: '@DiabetesExperts'
    },
    {
      title: 'Expert Thread',
      content: 'Key findings breakdown',
      date: '3h ago',
      author: '@ResearchNews'
    }
  ],
  youtube: [
    {
      title: 'Trial Results Explained',
      content: 'Video breakdown of key findings',
      date: '6h ago',
      author: 'DiabetesEducation'
    },
    {
      title: 'Expert Analysis Video',
      content: 'Detailed review of the system',
      date: '1d ago',
      author: 'MedTech Reviews'
    }
  ]
};

// Base Card Component
const BaseDiscussionCard = ({ icon: Icon, type, title, content, author, date }) => (
  <div className="bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium text-muted-foreground">{type}</span>
    </div>
    
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground mb-4">{content}</p>
    
    <div className="flex justify-between items-center text-sm text-muted-foreground">
      <span>{author}</span>
      <span>{date}</span>
    </div>
  </div>
);

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
  <BaseDiscussionCard {...props} icon={IconBrandTwitter} type="x" />
);

export const YoutubeCard = (props) => (
  <BaseDiscussionCard {...props} icon={IconBrandYoutube} type="youtube" />
);

// Main Discussions Section Component
const DiscussionsSection = ({ discussionData = defaultDiscussionData }) => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'all' },
    { id: 'experts', label: 'experts' },
    { id: 'online', label: 'online' },
    { id: 'reddit', label: 'reddit' },
    { id: 'studies', label: 'studies' },
    { id: 'x', label: 'x' },
    { id: 'youtube', label: 'youtube' }
  ];

  const getDisplayCards = () => {
    const data = discussionData || defaultDiscussionData;
    
    if (activeTab === 'all') {
      return Object.entries(data).flatMap(([type, items]) => 
        items.map(item => ({ ...item, type }))
      );
    }
    return data[activeTab] || [];
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

    return CardComponent ? <CardComponent key={card.title} {...card} /> : null;
  };

  return (
    <section className="prose prose-lg max-w-none mb-16">
      <h2 className="text-3xl font-bold mb-8">Related and Discussions</h2>
      
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getDisplayCards().map(renderCard)}
      </div>
    </section>
  );
};

export default DiscussionsSection;