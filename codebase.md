# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local

```

# .nvmrc

```
18

```

# components\DiscussionsSection.js

```js
import React, { useState } from 'react';
import { IconBrandReddit, IconBrandX, IconBrandYoutube, IconUsers, IconWorld, IconClipboardList, IconExternalLink } from '@tabler/icons-react';

// Base Card Component
const BaseDiscussionCard = ({ icon: Icon, type, title, author, outboundLink }) => (
  <div className="bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium text-muted-foreground">{type}</span>
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
    const allCardsWithTypes = {
      experts: expertCards.map(card => ({ ...card, type: 'experts' })),
      online: onlineCards.map(card => ({ ...card, type: 'online' })),
      reddit: redditCards.map(card => ({ ...card, type: 'reddit' })),
      studies: studyCards.map(card => ({ ...card, type: 'studies' })),
      x: xCards.map(card => ({ ...card, type: 'x' })),
      youtube: youtubeCards.map(card => ({ ...card, type: 'youtube' }))
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
```

# components\Hero.js

```js
// components/Hero.js
const Hero = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
          <span className="text-primary">Stay informed.</span>{' '}
          <span className="text-primary">Stay ahead.</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          Subscribe now for the latest breakthroughs, expert insights, and cutting-edge updates 
          in diabetes care—delivered straight to your inbox.
        </p>

        {/* Subscription Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Hero;
```

# components\IntroSection.js

```js
// components/IntroSection.js
const IntroSection = () => {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-8">
            Bringing you the latest advancements in diabetes care and research.
          </h2>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto">
            Find the latest research, treatments, and insights—all in one place.
          </p>
        </div>
      </section>
    );
  };
  
  export default IntroSection;
```

# components\Navbar.js

```js
import React, { useState } from 'react';
import { 
  IconMenu2, 
  IconSearch, 
  IconSun, 
  IconMoon, 
  IconX, 
  IconChevronDown, 
  IconChevronUp 
} from '@tabler/icons-react';
import Image from 'next/image';

const menuItems = [
  {
    title: 'OUTCOMES',
    children: ['Clinical Outcomes', 'Safety Outcomes', 'Patient-Reported Outcomes']
  },
  {
    title: 'INTERVENTIONS',
    children: ['Drug Interventions', 'Device Interventions', 'Behavioral Interventions']
  },
  {
    title: 'PARTICIPANTS',
    children: ['Inclusion Criteria', 'Exclusion Criteria', 'Demographics']
  },
  {
    title: 'TRIAL TYPE',
    children: ['Randomized', 'Non-Randomized', 'Observational']
  },
  {
    title: 'TRIAL SIZE',
    children: ['Small (<100)', 'Medium (100-500)', 'Large (>500)']
  },
  {
    title: 'TRIAL DURATION',
    children: ['Short-term', 'Medium-term', 'Long-term']
  },
  {
    title: 'GEOGRAPHY',
    children: ['North America', 'Europe', 'Asia', 'Other Regions']
  },
  {
    title: 'YEAR',
    children: ['2024', '2023', '2022', 'Earlier']
  },
  {
    title: 'SPONSORSHIP',
    children: ['Industry', 'Government', 'Academic', 'Other']
  }
];

export default function Navbar({ isDarkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <nav className="border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo1.png"
              alt="DeXdiabetes Logo"
              width={150}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-4">
            <button 
              className="p-2 rounded-full hover:bg-secondary text-foreground"
              aria-label="Search"
            >
              <IconSearch className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-secondary text-foreground"
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <IconSun className="w-5 h-5" />
              ) : (
                <IconMoon className="w-5 h-5" />
              )}
            </button>
            <button 
              className="p-2 rounded-full hover:bg-secondary text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <IconX className="w-5 h-5" />
              ) : (
                <IconMenu2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 w-full md:w-64 bg-background border-b border-l border-border shadow-lg">
            <div className="p-2">
              {menuItems.map((item, index) => (
                <div key={index} className="border-b border-border last:border-0">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full px-3 py-2 flex justify-between items-center text-foreground hover:text-primary hover:bg-secondary/50"
                  >
                    <span>{item.title}</span>
                    {openSection === index ? (
                      <IconChevronUp className="w-4 h-4" />
                    ) : (
                      <IconChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  
                  {openSection === index && (
                    <div className="pl-6 space-y-2 py-2 bg-secondary/10">
                      {item.children.map((child, childIndex) => (
                        <a
                          key={childIndex}
                          href="#"
                          className="block px-3 py-1 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50"
                        >
                          {child}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="#"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-secondary/50 font-semibold mt-2"
              >
                APPLY (#) →
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
```

# components\NewsGrid.js

```js
import React from 'react';
import { IconClock } from '@tabler/icons-react';

const NewsCard = ({ category, title, description, timeToRead }) => {
  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[16/9] bg-muted">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" className="w-full h-full">
          <rect width="400" height="225" fill="#f5f5f5"/>
          <rect x="40" y="60" width="320" height="10" rx="2" fill="#e0e0e0"/>
          <rect x="40" y="85" width="280" height="10" rx="2" fill="#e0e0e0"/>
          <rect x="40" y="110" width="320" height="10" rx="2" fill="#e0e0e0"/>
          <rect x="40" y="135" width="200" height="10" rx="2" fill="#e0e0e0"/>
          <circle cx="200" cy="90" r="30" fill="#e0e0e0"/>
          <path d="M190 90 h20 m-10 -10 v20" stroke="#f5f5f5" stroke-width="2"/>
          <text x="200" y="180" font-family="Arial, sans-serif" font-size="12" fill="#cccccc" text-anchor="middle">
            Image placeholder
          </text>
        </svg>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <span className="text-xs font-medium text-primary px-2.5 py-1 bg-primary/10 rounded-full">
            {category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <IconClock className="w-4 h-4 mr-1" />
          <span>{timeToRead} min read</span>
        </div>
      </div>
    </div>
  );
};

const NewsGrid = () => {
  const newsItems = [
    {
      category: 'Clinical Trial',
      title: 'Novel GLP-1 Receptor Agonist Shows Promising Results in Phase 3 Trial',
      description: 'Recent study demonstrates significant improvements in glycemic control and weight management in patients with type 2 diabetes.',
      timeToRead: 8
    },
    {
      category: 'Research',
      title: 'Artificial Pancreas Technology: A Game-Changer in T1D Management',
      description: 'Breakthrough in closed-loop insulin delivery systems shows improved outcomes in real-world settings.',
      timeToRead: 6
    },
    {
      category: 'Treatment',
      title: 'New Guidelines for Managing Post-Meal Blood Sugar Spikes',
      description: 'Updated recommendations focus on personalized approaches to postprandial glucose management.',
      timeToRead: 5
    },
    {
      category: 'Prevention',
      title: 'Early Intervention Strategies in Prediabetes Show Long-term Benefits',
      description: 'Longitudinal study reveals the importance of lifestyle modifications in preventing diabetes progression.',
      timeToRead: 7
    },
    {
      category: 'Technology',
      title: 'Smart Contact Lenses for Continuous Glucose Monitoring',
      description: 'Innovative wearable technology promises non-invasive glucose monitoring for diabetes patients.',
      timeToRead: 4
    },
    {
      category: 'Lifestyle',
      title: 'Mediterranean Diet and Diabetes Management',
      description: 'New research confirms the benefits of Mediterranean dietary patterns in glycemic control.',
      timeToRead: 6
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
          Previous
        </button>
        <button className="px-3 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">
          1
        </button>
        <button className="px-3 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-secondary/10">
          2
        </button>
        <button className="px-3 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-secondary/10">
          3
        </button>
        <span className="px-3 py-2 text-sm text-muted-foreground">...</span>
        <button className="px-3 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-secondary/10">
          8
        </button>
        <button className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-secondary/10">
          Next
        </button>
      </div>
    </section>
  );
};

export default NewsGrid;
```

# components\post-template\index.js

```js
import React, { useState } from 'react';
import { IconChevronUp, IconPhoto, IconFileAnalytics, IconBook, IconClock } from '@tabler/icons-react';
import DiscussionsSection from '../DiscussionsSection.js';


const BlogPost = ({
  title = "Understanding Artificial Pancreas Systems: Results from a 24-Month Trial",
  author = "Dr. Sarah Johnson",
  publishDate = "January 31, 2025",
  readTime = "8 min read",
  summary = "baba baba baba",
  studyDesign = {
    interventions: ["Continuous Monitoring", "Smart Insulin"],
    outcomes:["outcome 1", "outcome 2"],
    studyType: "Randomized Controlled Trial",
    duration: "24 Months",
    size: "500 Participants"
  },
  studyPopulation = {
    ageRange: "18-65 years",
    sex: "All genders",
    geography: ["Multi-center US", "Europe"],
    others: ["Type 1 Diabetes", "5+ years diagnosed"]
  },
  methodology = `The study employed a rigorous methodological framework to ensure data reliability and validity. 
    Participants were randomly assigned to treatment groups using a computer-generated algorithm.`,
  interventions = `The intervention protocol consisted of a multi-component diabetes management system integrating 
    continuous glucose monitoring with automated insulin delivery.`,
  keyFindings = `The study revealed significant improvements in glycemic control among intervention group 
    participants. Key outcomes included a 35% reduction in hypoglycemic events.`,
    comparison = `The study revealed significant improvements in glycemic control among intervention group 
    participants. Key outcomes included a 35% reduction in hypoglycemic events.`,
    biasScore = "Moderate",
  effectivenessAnalysis = {
    intervention: "AI-Driven Monitoring",
    effectiveness: "Moderate"
  },
  journalReference = {
    full: "daba daba daba"
  },
  expertCards = [],
  onlineCards = [],
  redditCards = [],
  studyCards = [],
  xCards = [],
  youtubeCards = []
}) => {
  // Back to top button visibility state
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Back to top button */}
      {showBackToTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
        >
          <IconChevronUp className="w-6 h-6" />
        </button>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <IconPhoto className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{author}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time>{publishDate}</time>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <IconClock className="w-4 h-4" />
                  {readTime}
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {studyDesign.interventions.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        <figure className="mb-16">
          <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
            <IconPhoto className="w-12 h-12 text-muted-foreground" />
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground text-center">
            Study visualization of the automated insulin delivery system
          </figcaption>
        </figure>
        <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Summary</h2>
            <p>{summary}</p>
          </section>

        {/* Study Design Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Study Design</h2>
          <div className="bg-secondary/5 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Interventions</h3>
                <div className="flex flex-wrap gap-2">
                  {studyDesign.interventions.map((intervention, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {intervention}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Study Type</h3>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  {studyDesign.studyType}
                </span>
              </div>
              <div>
                <h3 className="font-medium mb-2">Outcomes</h3>
                <div className="flex flex-wrap gap-2">
                  {studyDesign.outcomes.map((outcome, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {outcome}
                    </span>
                  ))}
                </div>
              </div>  
              <div>
                <h3 className="font-medium mb-2">Duration</h3>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {studyDesign.duration}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  
              <div>
                <h3 className="font-medium mb-2">Size</h3>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  {studyDesign.size}
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* Study Population Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Study Population</h2>
          <div className="bg-secondary/5 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Age Range</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {studyPopulation.ageRange}
                </span>
              </div>
              <div>
                <h3 className="font-medium mb-2">Sex</h3>
                <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                  {studyPopulation.sex}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Geography</h3>
              <div className="flex flex-wrap gap-2">
                {studyPopulation.geography.map((location, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {location}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Other Criteria</h3>
              <div className="flex flex-wrap gap-2">
                {studyPopulation.others.map((criterion, index) => (
                  <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {criterion}
                  </span>
                ))}
              </div>
            </div>
            
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="prose prose-lg max-w-none mb-16">
          <section>
            <h2>Methodology</h2>
            <p>{methodology}</p>
          </section>

          <section>
            <h2>Interventions</h2>
            <p>{interventions}</p>
          </section>

          <section>
            <h2>Key Findings</h2>
            <p>{keyFindings}</p>
          </section>
          <section>
            <h2>Comparison with other Studies</h2>
            <p>{comparison}</p>
          </section>
        </section>

              {/* Bias Analysis Section - Now in its own centered row */}
              <section className="mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-secondary/5 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4 justify-center">
                <IconFileAnalytics className="w-6 h-6" />
                <h2 className="text-xl font-bold">Bias Analysis Score </h2>
              </div>
              <div className="flex justify-center">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  {biasScore}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Effectiveness Analysis Section */}
        <section className="mb-16">
        <div className="flex items-center gap-2 mb-4" >
            <IconFileAnalytics className="w-6 h-6" />
            <h2 className="text-xl font-bold mb-4 gap-2">Effectiveness Analysis</h2>
        </div>
          

            <div className="space-y-5 bg-secondary/5 rounded-lg p-6  ">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Intervention:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {effectivenessAnalysis.intervention}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Effectiveness:</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  {effectivenessAnalysis.effectiveness}
                </span>
              </div>
            
          </div>
        </section>

        <section className="prose prose-lg max-w-none mb-16">
          
          <div className="flex items-center gap-2 mb-4">
            <IconBook className="w-6 h-6" />
            <h2 className="text-xl font-bold">Journal Reference</h2>
          </div>
            
            <p className="text-foreground">

              <span className="italic">{journalReference.full}</span>
            </p>
        </section>
        

        {/* Discussions Section */}
        <DiscussionsSection
          expertCards={expertCards}
          onlineCards={onlineCards}
          redditCards={redditCards}
          studyCards={studyCards}
          xCards={xCards}
          youtubeCards={youtubeCards}
        />
         {/* Newsletter Section */}
         <section className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay informed. Stay ahead.</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Subscribe now for the latest breakthroughs, expert insights, and cutting-edge updates in diabetes care—delivered straight to your inbox.
          </p>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPost;
```

# components\SearchSection.js

```js
// components/SearchSection.js
import { IconLock } from '@tabler/icons-react';

const SearchSection = () => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'behavioral', label: 'Behavioral' },
    { id: 'complications', label: 'Complications' },
    { id: 'prevention', label: 'Prevention' },
    { id: 'pharmacology', label: 'Pharmacology' },
    { id: 't1d', label: 'T1D' },
    { id: 'digital', label: 'Digital' },
    { id: 'precision-medicine', label: 'Precision Medicine' },
    { id: 'supplements', label: 'Supplements' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Search Articles</h1>
      
      <div className="relative mb-6 max-w-[70%] mx-auto">
        <input
          type="text"
          placeholder="Search for articles, topics, or keywords..."
          className="w-full px-4 py-3 rounded-full border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap gap-2 items-center max-w-[70%] mx-auto text-xs">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className="px-3 py-1.5 rounded-full border border-input bg-background hover:bg-secondary/10 transition-colors text-xs"
          >
            {filter.label}
          </button>
        ))}
        <button
          className="px-3 py-1.5 rounded-full border border-input bg-background hover:bg-secondary/10 transition-colors text-xs flex items-center gap-2"
        >
          <IconLock className="w-4 h-4" />
          FILTER
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
```

# package.json

```json
{
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "start": "next start"
  },
  "dependencies": {
    "@tabler/icons-react": "^3.29.0",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.10",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.4.1",
    "tailwindcss-animate": "^1.0.7"
  },
  "engines": {
    "node": ">=18"
  }
}

```

# pages\_app.js

```js
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

# pages\index.js

```js
// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import SearchSection from '../components/SearchSection';
import NewsGrid from '../components/NewsGrid';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>dexdiabetes - Stay Informed About Diabetes</title>
        <meta name="description" content="Stay informed about the latest breakthroughs in diabetes care" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <IntroSection />
      <SearchSection />
      <NewsGrid />
    </div>
  );
}
```

# pages\posts\artificial-pancreas-trial.js

```js
// pages/posts/artificial-pancreas-trial.js
import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import PostTemplate from '../../components/post-template';

export default function ArtificialPancreasTrialPost() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const postData = {
    title: "Long-term Outcomes of Artificial Pancreas Systems: A 24-Month Multi-Center Trial",
    summary: `esto si viene del blog post and diabetes 
      duration before being randomly assigned to either the intervention group (artificial pancreas system) 
      or the control group (standard insulin pump therapy) using a computer-generated algorithm.`,
    publishDate: "January 31, 2025",
    studyDesign: {
      interventions: ["Continuous Glucose Monitor", "Automated Insulin Pump"],
      outcomes: ["Improved Glycemic Control", "Reduced Hypoglycemic Events", "Quality of Life"],
      studyType: "Randomized Controlled Trial",
      duration: "24 Months",
      size: "500 Participants"
    },
    studyPopulation: {
      ageRange: "18-65 years",
      sex: "All genders",
      geography: ["Multi-center US", "Europe"],
      others: ["Type 1 Diabetes", "5+ years diagnosed"]
    },
    methodology: `This landmark study implemented a comprehensive methodological framework to evaluate the 
      long-term efficacy of artificial pancreas systems. Participants were stratified by age and diabetes 
      duration before being randomly assigned to either the intervention group (artificial pancreas system) 
      or the control group (standard insulin pump therapy) using a computer-generated algorithm.`,
    interventions: `The artificial pancreas system utilized in this study combined next-generation continuous 
      glucose monitoring technology with an advanced automated insulin delivery algorithm. The system 
      featured predictive hypoglycemia prevention, adaptive basal rate adjustment, and automated correction 
      boluses. Control group participants used standard insulin pump therapy with manual adjustments based 
      on CGM data.`,
    keyFindings: `The 24-month trial demonstrated significant clinical benefits of the artificial pancreas 
      system. Intervention group participants experienced a 35% reduction in hypoglycemic events and a 28% 
      improvement in time-in-range glucose levels compared to the control group. Additionally, HbA1c levels 
      showed a sustained reduction of 0.8% (9 mmol/mol) from baseline in the intervention group versus 0.3% 
      (3 mmol/mol) in the control group.`,
    biasScore: "Moderate",
    effectivenessAnalysis: {
      intervention: "AI-Driven Monitoring",
      effectiveness: "Moderate"
    },
    journalReference: {
      full: "Smith J, Johnson M, Williams R. Recent Advances in Diabetes Management: A Comprehensive Review. J Diabetes Res. 2024;15(3):125-140. doi:10.1234/jdr.2024.15.3.125"
    },
    // Discussion cards - all types included with dummy data
    expertCards: [
      {
        title: "Expert Analysis of AID Systems",
        outboundLink: "https://example.com/expert-analysis",
        author: "Dr. Sarah Chen"
      },
      {
        title: "Clinical Perspective on Trial Results",
        outboundLink: "https://example.com/expert-analysis",
        author: "Prof. Michael Roberts"
      }
    ],
    onlineCards: [
      {
        title: "Patient Experience Forum",
        outboundLink: "https://example.com/expert-analysis",
        author: "T1D Support Network"
      },
      {
        title: "Healthcare Provider Discussion",
        outboundLink: "https://example.com/expert-analysis",
        author: "Diabetes Care Community"
      }
    ],
    redditCards: [
      {
        title: "r/diabetes Tech Discussion",
        outboundLink: "https://example.com/expert-analysis",
        author: "r/diabetes"
      },
      {
        title: "Patient AMA Thread",
        outboundLink: "https://example.com/expert-analysis",
        author: "r/T1D"
      }
    ],
    studyCards: [
      {
        title: "Comparative Analysis",
        outboundLink: "https://example.com/expert-analysis",
        author: "Diabetes Research Institute"
      },
      {
        title: "Meta-analysis Update",
        outboundLink: "https://example.com/expert-analysis",
        author: "Clinical Trials Database"
      }
    ],
    xCards: [
      {
        title: "Research Impact Thread",
        outboundLink: "https://example.com/expert-analysis",
        author: "@DiabetesExperts"
      },
      {
        title: "Healthcare Policy Discussion",
        outboundLink: "https://example.com/expert-analysis",
        author: "@HealthPolicy"
      }
    ],
    youtubeCards: [
      {
        title: "Trial Results Explained",
        outboundLink: "https://example.com/expert-analysis",
        author: "DiabetesEd Channel"
      },
      {
        title: "Patient Success Stories",
        outboundLink: "https://example.com/expert-analysis",
        author: "Medical Tech Reviews"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{`${postData.title} - Dexdiabetes`}</title>
        <meta 
          name="description" 
          content="Latest results from a 24-month trial of an artificial pancreas system showing significant improvements in glycemic control." 
        />
      </Head>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main>
        <article>
          <PostTemplate {...postData} />
        </article>
      </main>
    </div>
  );
}
```

# postcss.config.js

```js
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

# public\favicon.ico

This is a binary file of the type: Binary

# public\logo1.png

This is a binary file of the type: Image

# public\vercel.svg

This is a file of the type: SVG Image

# README.md

```md
This is a starter template for [Learn Next.js](https://nextjs.org/learn).

```

# styles\global.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 346.8 83.3% 56.9%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 173 59% 56%;
    --secondary-foreground: 355.7 100% 97.3%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 346.8 83.3% 56.9%;
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 346.8 83.3% 56.9%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 173 59% 56%;
    --secondary-foreground: 355.7 100% 97.3%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 346.8 83.3% 56.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
}

html,
body {
  padding: 0;
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

img {
  max-width: 100%;
  height: auto;
}
```

# styles\Home.module.css

```css
.container {
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title a {
  color: #0070f3;
  text-decoration: none;
}

.title a:hover,
.title a:focus,
.title a:active {
  text-decoration: underline;
}

.title {
  margin: 0 0 1rem;
  line-height: 1.15;
  font-size: 3.6rem;
}

.title {
  text-align: center;
}

.title,
.description {
  text-align: center;
}

.description {
  line-height: 1.5;
  font-size: 1.5rem;
}

.grid {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 800px;
  margin-top: 3rem;
}

.card {
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition:
    color 0.15s ease,
    border-color 0.15s ease;
}

.card:hover,
.card:focus,
.card:active {
  color: #0070f3;
  border-color: #0070f3;
}

.card h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.card p {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
}

.logo {
  height: 1em;
}

@media (max-width: 600px) {
  .grid {
    width: 100%;
    flex-direction: column;
  }
}

```

# tailwind.config.js

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#ea384c",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#4FD1C5",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ],
}
```

