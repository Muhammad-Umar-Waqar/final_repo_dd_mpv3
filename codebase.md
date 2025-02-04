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

# components\ArticleTemplate.js

```js
import React from 'react';
import { IconPhoto } from '@tabler/icons-react';
import BlogPostHeader from './BlogPostHeader';
import Footer from './Footer';
import Navbar from './Navbar';
import RelatedPosts from './RelatedPosts';

const ArticleTemplate = ({
  title = "Article Title",
  subtitle = "",
  author = "Author Name",
  publisher = "Publisher Name",
  publishDate = "Publication Date",
  readTime = "5 min read",
  content = "",
  imageUrl = null,
  imageCaption = "",
  isDarkMode = false,
  toggleDarkMode = () => {},
  relatedPosts = []
}) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <BlogPostHeader 
          title={title}
          publisher={publisher}
          publishDate={publishDate}
          readTime={readTime}
        />

        {/* Subtitle if present */}
        {subtitle && (
          <p className="text-xl text-muted-foreground mb-8">
            {subtitle}
          </p>
        )}

        {/* Featured Image */}
        <figure className="mb-16">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageCaption || title}
              className="w-full rounded-lg"
            />
          ) : (
            <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
              <IconPhoto className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          {imageCaption && (
            <figcaption className="mt-2 text-sm text-muted-foreground text-center">
              {imageCaption}
            </figcaption>
          )}
        </figure>

        {/* Author info */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <span className="text-lg font-medium text-muted-foreground">
                {author[0]}
              </span>
            </div>
            <div>
              <p className="font-medium text-foreground">{author}</p>
              <p className="text-sm text-muted-foreground">
                {publishDate} · {readTime}
              </p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-16">
          {content}
        </article>


        {/* Newsletter Section */}
        <section className="bg-secondary/5 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-4">
            Stay Updated with the Latest Articles
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Subscribe to our newsletter for weekly updates on diabetes research and care.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              />
              <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </form>
        </section>
        
        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArticleTemplate;
```

# components\BlogPostHeader.js

```js
import React from 'react';
import { IconBookmark } from '@tabler/icons-react';
import ShareMenu from './ShareMenu';

const BlogPostHeader = ({ title, publisher, publishDate }) => {
  return (
    <header className="mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
        {title}
      </h1>
      <hr className="border-border mb-6" />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h4 className="font-medium text-foreground">{publisher}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <time>Published on {publishDate}</time>

            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-secondary/10 rounded-full">
            <IconBookmark className="w-6 h-6" />
          </button>
          <ShareMenu title={title} />
        </div>
      </div>
      <hr className="border-border" />
    </header>
  );
};

export default BlogPostHeader;
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
  <BaseDiscussionCard {...props} icon={IconBrandX} type="" />
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
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {getDisplayCards().map(renderCard)}
      </div>
    </section>
  );
};

export default DiscussionsSection;
```

# components\FilterMenu.js

```js
import React, { useState } from 'react';
import { IconChevronDown, IconChevronUp, IconX, IconSearch } from '@tabler/icons-react';

const FilterMenu = ({ isOpen, onClose }) => {
  const [openSection, setOpenSection] = useState(null);
  const [searchOutcomes, setSearchOutcomes] = useState('');
  const [searchInterventions, setSearchInterventions] = useState('');

  const outcomes = [
    "Clinical Outcomes", "Safety Outcomes",
    "Treatment Success", "Mortality Rate",
    "Side Effects", "Quality of Life",
    "Recovery Time", "Complication Rate",
    "Patient Satisfaction", "Cost Effectiveness"
  ];

  const interventions = [
    "Drug Therapy", "Medical Device",
    "Surgery", "Physical Therapy",
    "Behavioral", "Dietary",
    "Lifestyle", "Alternative Medicine",
    "Preventive Care", "Emergency Care"
  ];

  const filteredOutcomes = outcomes.filter(outcome =>
    outcome.toLowerCase().includes(searchOutcomes.toLowerCase())
  );

  const filteredInterventions = interventions.filter(intervention =>
    intervention.toLowerCase().includes(searchInterventions.toLowerCase())
  );

  const SearchableGrid = ({ items, searchValue, onSearchChange, placeholder }) => (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder || "Search..."}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-border rounded-md bg-background"
        />
        <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      </div>
      <div className="grid grid-cols-2 border border-border">
        {items.map((item, index) => (
          <label
            key={index}
            className="contents"
          >
            <div className="flex items-start border-b border-r border-border p-3">
              <input
                type="checkbox"
                className="mr-2 mt-1.5 flex-shrink-0"
              />
              <span className="text-sm whitespace-normal">{item}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const menuItems = [
    {
      title: "OUTCOMES",
      content: (
        <SearchableGrid
          items={filteredOutcomes}
          searchValue={searchOutcomes}
          onSearchChange={setSearchOutcomes}
          placeholder="Search outcomes..."
        />
      )
    },
    {
      title: "INTERVENTIONS",
      content: (
        <SearchableGrid
          items={filteredInterventions}
          searchValue={searchInterventions}
          onSearchChange={setSearchInterventions}
          placeholder="Search interventions..."
        />
      )
    },
    {
      title: "PARTICIPANTS",
      children: [
        'Male',
        'Female',
        'Pregnant',
        'Non-diabetics',
        'T2 Diabetes',
        'T1 Diabetes',
        'Prediabetes',
        'Insulin Resistance',
        'Children (≤13)',
        'Adolescent (13–18)',
        'Young Adult (19–39)',
        'Middle Aged (40-64)',
        'Older Adults (65+)'
      ]
    },
    {
      title: "TRIAL TYPE",
      children: [
        'Meta-Analysis',
        'Systematic Review',
        'RCTs',
        'Non-randomized CT',
        'Cohort',
        'Case-Control',
        'Cross-Sectional'
      ]
    },
    {
      title: "TRIAL SIZE",
      children: [
        'Small size (≤100)',
        'Medium size (100–500)',
        'Large size (500–5000)',
        'Mega size (5000+)'
      ]
    },
    {
      title: "TRIAL DURATION",
      children: [
        'Short-Term (≤3 mo)',
        'Medium-Term (3–12 mo)',
        'Long-Term (1–5 y)',
        'Extended (5–20+ y)'
      ]
    },
    {
      title: "GEOGRAPHY",
      children: [
        'North America',
        'Europe (EU & UK)',
        'Asia-Pacific (APAC)',
        'Latin America (LATAM)',
        'Middle East & North Africa (MENA)',
        'Sub-Saharan Africa'
      ]
    },
    {
      title: "YEAR",
      children: ['2024', '2023', '2022', 'Earlier']
    },
    {
      title: "SPONSORSHIP",
      children: ['Industry sponsored', 'Non-sponsored']
    }
  ];

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-80 bg-background border-l border-border transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="h-full overflow-y-auto">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary/10 rounded-full"
            aria-label="Close menu"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b border-border last:border-0">
              <button
                onClick={() => setOpenSection(openSection === index ? null : index)}
                className="w-full px-3 py-2 flex justify-between items-center text-foreground hover:text-primary hover:bg-secondary/10"
              >
                <span>{item.title}</span>
                {openSection === index ? (
                  <IconChevronUp className="w-4 h-4" />
                ) : (
                  <IconChevronDown className="w-4 h-4" />
                )}
              </button>
              
              {openSection === index && (
                <div className="px-3 py-2 bg-secondary/5">
                  {item.content || (
                    <div className="space-y-2">
                      {item.children.map((child, childIndex) => (
                        <label
                          key={childIndex}
                          className="flex items-center hover:bg-secondary/10 px-3 py-1 rounded"
                        >
                          <input
                            type="checkbox"
                            className="mr-2"
                          />
                          <span className="text-sm text-muted-foreground">{child}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <button
            className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
```

# components\Footer.js

```js
// components/Footer.js
import Link from 'next/link';
import { useTranslations } from '../utils/i18n';
import { IconUsers, IconMail, IconArchive, IconMessageCircle } from '@tabler/icons-react';

const Footer = () => {
  const { t } = useTranslations();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center justify-center md:justify-start">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <img
                src="/logo1.png"
                alt={t('footer.logoAlt')}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          
          <div className="flex justify-center md:justify-end col-span-3">
            <nav className="flex items-center space-x-8">
              <Link 
                href="/about"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <IconUsers className="w-5 h-5" />
                <span>{t('footer.about')}</span>
              </Link>
              
              <Link 
                href="/newsletter"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <IconMail className="w-5 h-5" />
                <span>{t('footer.newsletter')}</span>
              </Link>
              
              <Link 
                href="/archive"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <IconArchive className="w-5 h-5" />
                <span>{t('footer.archive')}</span>
              </Link>
              
              <Link 
                href="/contact"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <IconMessageCircle className="w-5 h-5" />
                <span>{t('footer.contact')}</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

# components\Hero.js

```js
// components/Hero.js
import { useTranslations } from '../utils/i18n';

const Hero = () => {
  const { t } = useTranslations();

  return (
    <main className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
          <span className="text-primary">{t('hero.stayInformed')}</span>{' '}
          <span className="text-primary">{t('hero.stayAhead')}</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          {t('hero.subtitle')}
        </p>

        {/* Subscription Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder={t('hero.emailPlaceholder')}
              className="flex-1 px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {t('hero.subscribeButton')}
            </button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            {t('hero.privacyNote')}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Hero;
```

# components\InterventionsPage.js

```js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IconChevronDown, IconFilter } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';

const InterventionsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [effectivenessFilter, setEffectivenessFilter] = useState('all');
  const [biasFilter, setBiasFilter] = useState('all');
  const [showEffectivenessDropdown, setShowEffectivenessDropdown] = useState(false);
  const [showBiasDropdown, setBiasDropdown] = useState(false);
  const { t } = useTranslations();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const interventionsData = [
    {
      intervention: 'Intervention 1',
      outcomes: [
        { name: 'Outcome 1', effectiveness: 'High', studies: 13, bias: 'Low' },
        { name: 'Outcome 2', effectiveness: 'Low', studies: 5, bias: 'Medium' },
        { name: 'Outcome 3', effectiveness: 'Med', studies: 7, bias: 'Moderate' },
      ]
    },
    // ... other data
  ];

  const filteredInterventions = interventionsData
    .map(intervention => ({
      ...intervention,
      outcomes: intervention.outcomes.filter(outcome => {
        const matchesSearch = intervention.intervention.toLowerCase().includes(filterText.toLowerCase()) ||
                            outcome.name.toLowerCase().includes(filterText.toLowerCase());
        const matchesEffectiveness = effectivenessFilter === 'all' || outcome.effectiveness === effectivenessFilter;
        const matchesBias = biasFilter === 'all' || outcome.bias === biasFilter;
        return matchesSearch && matchesEffectiveness && matchesBias;
      })
    }))
    .filter(intervention => intervention.outcomes.length > 0);

  const getEffectivenessColor = (effectiveness) => {
    switch (effectiveness.toLowerCase()) {
      case 'high':
        return 'text-green-600';
      case 'med':
        return 'text-yellow-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const effectivenessOptions = ['all', 'High', 'Med', 'Low'];
  const biasOptions = ['all', 'Low', 'Medium', 'Moderate'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('interventions.title')}</h1>
        
        {/* Search and Filters Row */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          {/* Search Input */}
          <div className="flex-grow max-w-md">
            <input
              type="text"
              placeholder={t('interventions.filterPlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          {/* Effectiveness Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setShowEffectivenessDropdown(!showEffectivenessDropdown);
                setBiasDropdown(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <IconFilter className="w-4 h-4" />
              {t('interventions.effectiveness')}
              <IconChevronDown className="w-4 h-4" />
            </button>
            
            {showEffectivenessDropdown && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {effectivenessOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setEffectivenessFilter(option);
                      setShowEffectivenessDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      effectivenessFilter === option ? 'bg-gray-100' : ''
                    }`}
                  >
                    {option === 'all' ? t('interventions.filters.allEffectiveness') : option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bias Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setBiasDropdown(!showBiasDropdown);
                setShowEffectivenessDropdown(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <IconFilter className="w-4 h-4" />
              {t('interventions.bias')}
              <IconChevronDown className="w-4 h-4" />
            </button>
            
            {showBiasDropdown && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {biasOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setBiasFilter(option);
                      setBiasDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      biasFilter === option ? 'bg-gray-100' : ''
                    }`}
                  >
                    {option === 'all' ? t('interventions.filters.allBias') : option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  {t('interventions.tableHeaders.intervention')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  {t('interventions.tableHeaders.outcome')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  {t('interventions.tableHeaders.effectiveness')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  {t('interventions.tableHeaders.studies')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  {t('interventions.tableHeaders.bias')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInterventions.map((item, index) => (
                item.outcomes.map((outcome, outcomeIndex) => (
                  <tr 
                    key={`${index}-${outcomeIndex}`}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    {outcomeIndex === 0 ? (
                      <td 
                        className="px-6 py-4" 
                        rowSpan={item.outcomes.length}
                      >
                        {item.intervention}
                      </td>
                    ) : null}
                    <td className="px-6 py-4">{outcome.name}</td>
                    <td className={`px-6 py-4 ${getEffectivenessColor(outcome.effectiveness)}`}>
                      {outcome.effectiveness}
                    </td>
                    <td className="px-6 py-4">
                      <a href="#" className="text-primary hover:underline">
                        {outcome.studies}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      {outcome.bias}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InterventionsPage;
```

# components\IntroSection.js

```js
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
```

# components\MedicationsPage.js

```js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IconChevronDown, IconFilter } from '@tabler/icons-react';

const MedicationsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [effectivenessFilter, setEffectivenessFilter] = useState('all');
  const [biasFilter, setBiasFilter] = useState('all');
  const [showEffectivenessDropdown, setShowEffectivenessDropdown] = useState(false);
  const [showBiasDropdown, setBiasDropdown] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const medicationsData = [
    {
      medication: 'Medication 1',
      outcomes: [
        { name: 'Outcome 1', effectiveness: 'High', studies: 13, bias: 'Low' },
        { name: 'Outcome 2', effectiveness: 'Low', studies: 5, bias: 'Medium' },
        { name: 'Outcome 3', effectiveness: 'Med', studies: 7, bias: 'Moderate' },
      ]
    },
    {
      medication: 'Medication 2',
      outcomes: [
        { name: 'Outcome 1', effectiveness: 'High', studies: 13, bias: 'Low' },
        { name: 'Outcome 2', effectiveness: 'Low', studies: 5, bias: 'Medium' }
      ]
    },
    {
      medication: 'Medication 3',
      outcomes: [
        { name: 'Outcome 4', effectiveness: 'High', studies: 13, bias: 'Low' }
      ]
    },
  ];

  // Filter medications based on all criteria
  const filteredMedications = medicationsData
    .map(medication => ({
      ...medication,
      outcomes: medication.outcomes.filter(outcome => {
        const matchesSearch = medication.medication.toLowerCase().includes(filterText.toLowerCase()) ||
                            outcome.name.toLowerCase().includes(filterText.toLowerCase());
        const matchesEffectiveness = effectivenessFilter === 'all' || outcome.effectiveness === effectivenessFilter;
        const matchesBias = biasFilter === 'all' || outcome.bias === biasFilter;
        return matchesSearch && matchesEffectiveness && matchesBias;
      })
    }))
    .filter(medication => medication.outcomes.length > 0);

  const getEffectivenessColor = (effectiveness) => {
    switch (effectiveness.toLowerCase()) {
      case 'high':
        return 'text-green-600';
      case 'med':
        return 'text-yellow-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Filter options
  const effectivenessOptions = ['all', 'High', 'Med', 'Low'];
  const biasOptions = ['all', 'Low', 'Medium', 'Moderate'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Medications Analysis</h1>
        
        {/* Search and Filters Row */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          {/* Search Input */}
          <div className="flex-grow max-w-md">
            <input
              type="text"
              placeholder="Filter medications..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          {/* Effectiveness Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setShowEffectivenessDropdown(!showEffectivenessDropdown);
                setBiasDropdown(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <IconFilter className="w-4 h-4" />
              Effectiveness
              <IconChevronDown className="w-4 h-4" />
            </button>
            
            {showEffectivenessDropdown && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {effectivenessOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setEffectivenessFilter(option);
                      setShowEffectivenessDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      effectivenessFilter === option ? 'bg-gray-100' : ''
                    }`}
                  >
                    {option === 'all' ? 'All Effectiveness' : option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bias Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setBiasDropdown(!showBiasDropdown);
                setShowEffectivenessDropdown(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <IconFilter className="w-4 h-4" />
              Bias
              <IconChevronDown className="w-4 h-4" />
            </button>
            
            {showBiasDropdown && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {biasOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setBiasFilter(option);
                      setBiasDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      biasFilter === option ? 'bg-gray-100' : ''
                    }`}
                  >
                    {option === 'all' ? 'All Bias Levels' : option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Medication</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Outcome</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Effectiveness</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Studies</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Bias</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedications.map((item, index) => (
                item.outcomes.map((outcome, outcomeIndex) => (
                  <tr 
                    key={`${index}-${outcomeIndex}`}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    {outcomeIndex === 0 ? (
                      <td 
                        className="px-6 py-4" 
                        rowSpan={item.outcomes.length}
                      >
                        {item.medication}
                      </td>
                    ) : null}
                    <td className="px-6 py-4">{outcome.name}</td>
                    <td className={`px-6 py-4 ${getEffectivenessColor(outcome.effectiveness)}`}>
                      {outcome.effectiveness}
                    </td>
                    <td className="px-6 py-4">
                      <a href="#" className="text-primary hover:underline">
                        {outcome.studies}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      {outcome.bias}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MedicationsPage;
```

# components\Navbar.js

```js
// components/Navbar.js
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from '../utils/i18n';
import { 
  IconMenu2, 
  IconSearch, 
  IconSun, 
  IconMoon,
  IconHome2,
  IconClipboardHeart,
  IconHeartFilled,
  IconVaccineBottle,
  IconFeatherFilled,
  IconCrown,
  IconLogin,
  IconX
} from '@tabler/icons-react';

const MenuItem = ({ icon: Icon, text, href = '/' }) => {
  const router = useRouter();
  const { locale } = router;
  
  return (
    <Link 
      href={href}
      locale={locale}
      className="flex items-center gap-3 px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/10 rounded-lg transition-colors"
    >
      <Icon className="w-5 h-5" />
      <span className="text-lg whitespace-nowrap">{text}</span>
    </Link>
  );
};

export default function Navbar({ isDarkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, locale, changeLanguage } = useTranslations();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    changeLanguage(newLocale);
  };

  return (
    <>
      <nav className="relative border-b border-border bg-background z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" locale={locale} className="hover:opacity-90 transition-opacity">
                <img
                  src="/logo1.png"
                  alt="DeXdiabetes Logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 rounded-md border border-border hover:bg-secondary/10 text-foreground text-sm font-medium transition-colors"
                aria-label="Toggle language"
              >
                {locale?.toUpperCase()}
              </button>
              
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
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-secondary text-foreground relative"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <IconX className="w-5 h-5" />
                ) : (
                  <IconMenu2 className="w-5 h-5" />
                )}
                {/* Navigation Menu */}
                <div 
                  className={`absolute top-0 right-[3.5rem] sm:right-16 bg-background border border-border rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  } z-40 w-[calc(100vw-5rem)] sm:w-auto sm:min-w-[300px] max-w-[280px] sm:max-w-none mx-2 sm:mx-0`}
                >
                  <div className="p-4">
                    <nav className="space-y-1">
                      <MenuItem icon={IconHome2} text={t('nav.home')} href="/" />
                      <MenuItem icon={IconClipboardHeart} text={t('nav.interventions')} href="/interventions" />
                      <MenuItem icon={IconHeartFilled} text={t('nav.outcomes')} href="/outcomes" />
                      <MenuItem icon={IconVaccineBottle} text={t('nav.medications')} href="/medications" />
                      <MenuItem icon={IconFeatherFilled} text={t('nav.supplements')} href="/supplements" />
                    </nav>
                    
                    <div className="h-px bg-border my-4" />
                    
                    <div>
                      <MenuItem icon={IconCrown} text={t('nav.premium')} href="/premium" />
                      <MenuItem icon={IconLogin} text={t('nav.login')} href="/auth" />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Overlay when menu is open (only on mobile) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 transition-opacity duration-300 z-30 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
```

# components\NavMenu.js

```js
// components/NavMenu.js
import React from 'react';
import Link from 'next/link';
import { 
  IconHome2,
  IconHandRock,
  IconHeartFilled,
  IconShieldFilled,
  IconDeviceMobile,
  IconVaccineBottle,
  IconMicroscope,
  IconClock,
  IconSearch,
  IconLogin,
  IconCrown
} from '@tabler/icons-react';

const MenuItem = ({ icon: Icon, text, href = '/' }) => (
  <Link 
    href={href}
    className="flex items-center gap-3 px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/10 rounded-lg transition-colors"
  >
    <Icon className="w-5 h-5" />
    <span className="text-lg whitespace-nowrap">{text}</span>
  </Link>
);

const NavMenu = ({ isOpen, onClose }) => {
  return (
    <>
      <div 
        className={`fixed inset-y-0 left-0 w-72 bg-background border-r border-border transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } z-50`}
      >
        <div className="h-full flex flex-col py-6">
          <nav className="flex-1 space-y-1">
          <MenuItem icon={IconHome2} text="Home" href="/" />
          <MenuItem icon={IconClipboardHeart} text="Interventions" href="/interventions" />
          <MenuItem icon={IconHeartFilled} text="Outcomes" href="/outcomes" />
          <MenuItem icon={IconVaccineBottle} text="Medications" href="/medications" />
          <MenuItem icon={IconFeatherFilled} text="Supplements" href="/supplements" />
          <MenuItem icon={IconSearch} text="Search" href="/search" />
          </nav>
          
          {/* Divider */}
          <div className="h-px bg-border my-4" />
          
          {/* Bottom menu items */}
          <div className="px-4 space-y-1">
            <MenuItem icon={IconCrown} text="Premium Membership" href="/premium" />
            <MenuItem icon={IconLogin} text="Login / Sign-up" href="/auth" />
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
    </>
  );
};

export default NavMenu;
```

# components\NewsCard.js

```js
import React from 'react';
import { IconClock, IconBookmark } from '@tabler/icons-react';
import ShareMenu from './ShareMenu';

const NewsCard = ({ category, title, description, publisher, publishDate, timeToRead }) => {
  return (
    <div className="bg-background border border-border rounded-lg overflow-visible hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[16/9] bg-muted">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" className="w-full h-full">
          <rect width="400" height="225" fill="#f5f5f5"/>
          <rect x="40" y="60" width="320" height="10" rx="2" fill="#e0e0e0"/>
          <rect x="40" y="85" width="280" height="10" rx="2" fill="#e0e0e0"/>
          <rect x="40" y="110" width="320" height="10" rx="2" fill="#e0e0e0"/>
          <rect x="40" y="135" width="200" height="10" rx="2" fill="#e0e0e0"/>
          <circle cx="200" cy="90" r="30" fill="#e0e0e0"/>
          <path d="M190 90 h20 m-10 -10 v20" stroke="#f5f5f5" strokeWidth="2"/>
          <text x="200" y="180" fontFamily="Arial, sans-serif" fontSize="12" fill="#cccccc" textAnchor="middle">
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
          {publisher}
        </p>
        <hr className="border-border mb-6" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div>
              <h4 className="font-medium text-foreground">{publisher}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time>{publishDate}</time>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-secondary/10 rounded-full">
              <IconBookmark className="w-6 h-6" />
            </button>
            <ShareMenu title={title} />
          </div>
        </div>
        <hr className="border-border" />
      </div>
    </div>
  );
};

export default NewsCard;
```

# components\NewsGrid.js

```js
import React from 'react';
import { useTranslations } from '../utils/i18n';
import NewsCard from './NewsCard';

const NewsGrid = () => {
  const { t } = useTranslations();

  const newsItems = [
    {
      category: 'Clinical Trial',
      title: 'Novel GLP-1 Receptor Agonist Shows Promising Results in Phase 3 Trial',
      description: 'Recent study demonstrates significant improvements in glycemic control and weight management in patients with type 2 diabetes.',
      publisher: 'Diabetes Obesity & Metabolism',
      publishDate: '2023-10-15',
      timeToRead: 8
    },
    {
      category: 'Research',
      title: 'Artificial Pancreas Technology: A Game-Changer in T1D Management',
      description: 'Breakthrough in closed-loop insulin delivery systems shows improved outcomes in real-world settings.',
      publisher: 'Nature Medicine',
      publishDate: '2023-10-10',
      timeToRead: 6
    },
    {
      category: 'Treatment',
      title: 'New Guidelines for Managing Post-Meal Blood Sugar Spikes',
      description: 'Updated recommendations focus on personalized approaches to postprandial glucose management.',
      publisher: 'Diabetes Care',
      publishDate: '2023-10-05',
      timeToRead: 5
    },
    {
      category: 'Prevention',
      title: 'Early Intervention Strategies in Prediabetes Show Long-term Benefits',
      description: 'Longitudinal study reveals the importance of lifestyle modifications in preventing diabetes progression.',
      publisher: 'Diabetes',
      publishDate: '2023-10-01',
      timeToRead: 7
    },
    {
      category: 'Technology',
      title: 'Smart Contact Lenses for Continuous Glucose Monitoring',
      description: 'Innovative wearable technology promises non-invasive glucose monitoring for diabetes patients.',
      publisher: 'IEEE Spectrum',
      publishDate: '2023-09-25',
      timeToRead: 4
    },
    {
      category: 'Lifestyle',
      title: 'Mediterranean Diet and Diabetes Management',
      description: 'New research confirms the benefits of Mediterranean dietary patterns in glycemic control.',
      publisher: 'Journal of the American Medical Association',
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
        <button 
          className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed" 
          disabled
        >
          {t('newsGrid.pagination.previous')}
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
          {t('newsGrid.pagination.next')}
        </button>
      </div>
    </section>
  );
};

export default NewsGrid;
```

# components\OutcomesPage.js

```js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IconChevronDown, IconFilter } from '@tabler/icons-react';

const OutcomesPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [effectivenessFilter, setEffectivenessFilter] = useState('all');
  const [biasFilter, setBiasFilter] = useState('all');
  const [showEffectivenessDropdown, setShowEffectivenessDropdown] = useState(false);
  const [showBiasDropdown, setBiasDropdown] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const outcomesData = [
    {
      outcome: 'Outcome 1',
      interventions: [
        { name: 'Intervention 1', effectiveness: 'High', studies: 13, bias: 'Low' },
        { name: 'Intervention 2', effectiveness: 'Low', studies: 5, bias: 'Medium' },
        { name: 'Intervention 3', effectiveness: 'Med', studies: 7, bias: 'Moderate' },
      ]
    },
    {
      outcome: 'Outcome 2',
      interventions: [
        { name: 'Intervention 1', effectiveness: 'High', studies: 13, bias: 'Low' },
        { name: 'Intervention 2', effectiveness: 'Low', studies: 5, bias: 'Medium' }
      ]
    },
    {
      outcome: 'Outcome 3',
      interventions: [
        { name: 'Intervention 4', effectiveness: 'High', studies: 13, bias: 'Low' }
      ]
    },
  ];

  const filteredOutcomes = outcomesData
    .map(outcome => ({
      ...outcome,
      interventions: outcome.interventions.filter(intervention => {
        const matchesSearch = outcome.outcome.toLowerCase().includes(filterText.toLowerCase()) ||
                            intervention.name.toLowerCase().includes(filterText.toLowerCase());
        const matchesEffectiveness = effectivenessFilter === 'all' || intervention.effectiveness === effectivenessFilter;
        const matchesBias = biasFilter === 'all' || intervention.bias === biasFilter;
        return matchesSearch && matchesEffectiveness && matchesBias;
      })
    }))
    .filter(outcome => outcome.interventions.length > 0);

  const getEffectivenessColor = (effectiveness) => {
    switch (effectiveness.toLowerCase()) {
      case 'high':
        return 'text-green-600';
      case 'med':
        return 'text-yellow-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const effectivenessOptions = ['all', 'High', 'Med', 'Low'];
  const biasOptions = ['all', 'Low', 'Medium', 'Moderate'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Outcomes Analysis</h1>
        
        {/* Search and Filters Row */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          {/* Search Input */}
          <div className="flex-grow max-w-md">
            <input
              type="text"
              placeholder="Filter outcomes..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          {/* Effectiveness Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setShowEffectivenessDropdown(!showEffectivenessDropdown);
                setBiasDropdown(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <IconFilter className="w-4 h-4" />
              Effectiveness
              <IconChevronDown className="w-4 h-4" />
            </button>
            
            {showEffectivenessDropdown && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {effectivenessOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setEffectivenessFilter(option);
                      setShowEffectivenessDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      effectivenessFilter === option ? 'bg-gray-100' : ''
                    }`}
                  >
                    {option === 'all' ? 'All Effectiveness' : option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bias Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setBiasDropdown(!showBiasDropdown);
                setShowEffectivenessDropdown(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <IconFilter className="w-4 h-4" />
              Bias
              <IconChevronDown className="w-4 h-4" />
            </button>
            
            {showBiasDropdown && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {biasOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setBiasFilter(option);
                      setBiasDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      biasFilter === option ? 'bg-gray-100' : ''
                    }`}
                  >
                    {option === 'all' ? 'All Bias Levels' : option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Outcome</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Intervention</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Effectiveness</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Studies</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Bias</th>
              </tr>
            </thead>
            <tbody>
              {filteredOutcomes.map((item, index) => (
                item.interventions.map((intervention, interventionIndex) => (
                  <tr 
                    key={`${index}-${interventionIndex}`}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    {interventionIndex === 0 ? (
                      <td 
                        className="px-6 py-4" 
                        rowSpan={item.interventions.length}
                      >
                        {item.outcome}
                      </td>
                    ) : null}
                    <td className="px-6 py-4">{intervention.name}</td>
                    <td className={`px-6 py-4 ${getEffectivenessColor(intervention.effectiveness)}`}>
                      {intervention.effectiveness}
                    </td>
                    <td className="px-6 py-4">
                      <a href="#" className="text-primary hover:underline">
                        {intervention.studies}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      {intervention.bias}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OutcomesPage;
```

# components\PostTemplate.js

```js
import React, { useState } from 'react';
import { IconChevronUp, IconPhoto, IconFileTextAi } from '@tabler/icons-react';
import DiscussionsSection from './DiscussionsSection';
import RelatedPosts from './RelatedPosts';
import BlogPostHeader from './BlogPostHeader';
import Footer from './Footer';

const PostTemplate = ({
  title = "Understanding Artificial Pancreas Systems: Results from a 24-Month Trial",
  author = "Dr. Sarah Johnson",
  publisher = "Diabetes Research Journal",
  publishDate = "January 31, 2025",
  readTime = "8 min read",
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
  effectivenessAnalysis = {
    intervention: "",
    effectiveness: ""
  },
  journalReference = {
    full: ""
  },
  expertCards = [],
  onlineCards = [],
  redditCards = [],
  studyCards = [],
  xCards = [],
  youtubeCards = [],
  relatedPosts = []
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

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
        <BlogPostHeader
          title={title}
          publisher={publisher}
          publishDate={publishDate}
          readTime={readTime}
        />

        <figure className="mb-16">
          <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
            <IconPhoto className="w-12 h-12 text-muted-foreground" />
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground text-center">
            Study visualization of the automated insulin delivery system
          </figcaption>
        </figure>

        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="mb-6">Summary</h2>
          <p>{summary}</p>
        </section>

        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="mb-6">Study Design</h2>
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
                <h3 className="font-medium mb-2">Duration and Size</h3>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm mr-2">
                  {studyDesign.duration}
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  {studyDesign.size}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="mb-6">Study Population</h2>
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

        <section>
          <div className="max-w-2xl mx-auto">
            <div className="bg-secondary/5 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4 justify-center">
                <IconFileTextAi className="w-6 h-6" />
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

        <section className="prose prose-lg max-w-none">
          <section>
            <div className="flex mb-4">
              <h2>Effectiveness Analysis</h2>
            </div>
            <div className="space-y-5 bg-secondary/5 rounded-lg p-6">
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
        </section>

        <section className="prose prose-lg max-w-none mb-16">
          <section>
            <h2>Journal Reference</h2>
            <p className="italic">{journalReference.full}</p>
          </section>
        </section>

        <DiscussionsSection
          expertCards={expertCards}
          onlineCards={onlineCards}
          redditCards={redditCards}
          studyCards={studyCards}
          xCards={xCards}
          youtubeCards={youtubeCards}
        />

        <section className="max-w-4xl bg-gray-50 mx-auto px-4 py-16 text-center">
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

        <RelatedPosts posts={relatedPosts} />
      </main>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default PostTemplate;
```

# components\RelatedPosts.js

```js
import React from 'react';
import Link from 'next/link';

const PostCard = ({ title, date, description, slug }) => (
  <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="aspect-[16/9] bg-muted">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" className="w-full h-full">
        <rect width="400" height="225" fill="#f5f5f5"/>
        <rect x="40" y="60" width="320" height="10" rx="2" fill="#e0e0e0"/>
        <rect x="40" y="85" width="280" height="10" rx="2" fill="#e0e0e0"/>
        <rect x="40" y="110" width="320" height="10" rx="2" fill="#e0e0e0"/>
        <rect x="40" y="135" width="200" height="10" rx="2" fill="#e0e0e0"/>
      </svg>
    </div>
    <div className="p-6">
      <Link href={`/${slug}`}>
        <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
          {title}
        </h3>
      </Link>
      <time className="text-sm text-muted-foreground block mb-3">{date}</time>
      <p className="text-muted-foreground line-clamp-2">
        {description}
      </p>
    </div>
  </div>
);

const RelatedPosts = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl font-bold mb-8">You might also Like ...</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
```

# components\SearchSection.js

```js
import React, { useState } from 'react';
import { IconLock } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';
import FilterMenu from './FilterMenu';

const SearchSection = () => {
  const { t } = useTranslations();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  const filters = [
    { id: 'all', labelKey: 'searchSection.filters.all' },
    { id: 'behavioral', labelKey: 'searchSection.filters.behavioral' },
    { id: 'complications', labelKey: 'searchSection.filters.complications' },
    { id: 'digital', labelKey: 'searchSection.filters.digital' },
    { id: 'pharmacology', labelKey: 'searchSection.filters.pharmacology' },
    { id: 'prevention', labelKey: 'searchSection.filters.prevention' },
    { id: 'supplements', labelKey: 'searchSection.filters.supplements' },
    { id: 't1d', labelKey: 'searchSection.filters.t1d' },
  ];

  // Add overlay when filter menu is open
  const Overlay = () => (
    <div
      className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
        isFilterMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } z-40`}
      onClick={() => setIsFilterMenuOpen(false)}
    />
  );

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-4xl font-bold text-center mb-8">
          {t('searchSection.title')}
        </h2>
        
        <div className="relative mb-6 max-w-[70%] mx-auto">
          <input
            type="text"
            placeholder={t('searchSection.searchPlaceholder')}
            className="w-full px-4 py-3 rounded-full border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            {t('searchSection.searchButton')}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 items-center max-w-[70%] mx-auto text-xs">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className="px-3 py-1.5 rounded-full border border-input bg-background hover:bg-secondary/10 transition-colors text-xs"
            >
              {t(filter.labelKey)}
            </button>
          ))}
          <button
            onClick={() => setIsFilterMenuOpen(true)}
            className="px-3 py-1.5 rounded-full border border-input bg-background hover:bg-secondary/10 transition-colors text-xs flex items-center gap-2"
          >
            <IconLock className="w-4 h-4" />
            {t('searchSection.filterButton')}
          </button>
        </div>
      </section>

      <Overlay />
      <FilterMenu 
        isOpen={isFilterMenuOpen} 
        onClose={() => setIsFilterMenuOpen(false)} 
      />
    </>
  );
};

export default SearchSection;
```

# components\ShareMenu.js

```js
import React, { useState, useRef, useEffect } from 'react';
import { IconShare2, IconLink, IconBrandX, IconBrandFacebook, IconBrandLinkedin } from '@tabler/icons-react';

const ShareMenu = ({ title, className = "" }) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const shareMenuRef = useRef(null);
  const shareButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareMenuRef.current && 
        !shareMenuRef.current.contains(event.target) &&
        !shareButtonRef.current.contains(event.target)
      ) {
        setIsShareMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShare = (platform) => {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(title);
    
    const shareLinks = {
      copyLink: () => {
        navigator.clipboard.writeText(window.location.href);
        // You might want to add a toast notification here
      },
      x: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
    };

    if (platform === 'copyLink') {
      shareLinks.copyLink();
    } else {
      window.open(shareLinks[platform], '_blank');
    }
    
    setIsShareMenuOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button 
        ref={shareButtonRef}
        className="p-2 hover:bg-secondary/10 rounded-full"
        onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
      >
        <IconShare2 className="w-6 h-6" />
      </button>
      
      {isShareMenuOpen && (
        <div 
          ref={shareMenuRef}
          className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50"
          style={{
            position: 'absolute',
            right: '0',
            top: '100%',
            transform: 'translateY(8px)'
          }}
        >
          <div className="py-2">
            <div className="ml-4"><p className="font-bold">Share on:</p></div>
            
            <button
              onClick={() => handleShare('copyLink')}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-secondary/10"
            >
              <IconLink className="w-4 h-4" />
              Copy link
            </button>
            <button
              onClick={() => handleShare('x')}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-secondary/10"
            >
              <IconBrandX className="w-4 h-4" />
              X (Twitter)
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-secondary/10"
            >
              <IconBrandFacebook className="w-4 h-4" />
              Facebook
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-secondary/10"
            >
              <IconBrandLinkedin className="w-4 h-4" />
              LinkedIn
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareMenu;
```

# components\SupplementsPage.js

```js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IconChevronDown, IconFilter } from '@tabler/icons-react';

const SupplementsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [effectivenessFilter, setEffectivenessFilter] = useState('all');
  const [biasFilter, setBiasFilter] = useState('all');
  const [showEffectivenessDropdown, setShowEffectivenessDropdown] = useState(false);
  const [showBiasDropdown, setBiasDropdown] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const supplementsData = [
    {
      supplement: 'Supplement 1',
      outcomes: [
        { name: 'Outcome 1', effectiveness: 'High', studies: 13, bias: 'Low' },
        { name: 'Outcome 2', effectiveness: 'Low', studies: 5, bias: 'Medium' },
        { name: 'Outcome 3', effectiveness: 'Med', studies: 7, bias: 'Moderate' },
      ]
    },
    {
      supplement: 'Supplement 2',
      outcomes: [
        { name: 'Outcome 1', effectiveness: 'High', studies: 13, bias: 'Low' },
        { name: 'Outcome 2', effectiveness: 'Low', studies: 5, bias: 'Medium' }
      ]
    },
    {
      supplement: 'Supplement 3',
      outcomes: [
        { name: 'Outcome 4', effectiveness: 'High', studies: 13, bias: 'Low' }
      ]
    },
  ];

  const filteredSupplements = supplementsData
    .map(supplement => ({
      ...supplement,
      outcomes: supplement.outcomes.filter(outcome => {
        const matchesSearch = supplement.supplement.toLowerCase().includes(filterText.toLowerCase()) ||
                            outcome.name.toLowerCase().includes(filterText.toLowerCase());
        const matchesEffectiveness = effectivenessFilter === 'all' || outcome.effectiveness === effectivenessFilter;
        const matchesBias = biasFilter === 'all' || outcome.bias === biasFilter;
        return matchesSearch && matchesEffectiveness && matchesBias;
      })
    }))
    .filter(supplement => supplement.outcomes.length > 0);

  const getEffectivenessColor = (effectiveness) => {
    switch (effectiveness.toLowerCase()) {
      case 'high':
        return 'text-green-600';
      case 'med':
        return 'text-yellow-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const effectivenessOptions = ['all', 'High', 'Med', 'Low'];
  const biasOptions = ['all', 'Low', 'Medium', 'Moderate'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Supplements Analysis</h1>
        
        {/* Search and Filters Row */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          {/* Search Input */}
          <div className="flex-grow max-w-md">
            <input
              type="text"
              placeholder="Filter supplements..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          {/* Effectiveness Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setShowEffectivenessDropdown(!showEffectivenessDropdown);
                setBiasDropdown(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <IconFilter className="w-4 h-4" />
              Effectiveness
              <IconChevronDown className="w-4 h-4" />
            </button>
            
            {showEffectivenessDropdown && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {effectivenessOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setEffectivenessFilter(option);
                      setShowEffectivenessDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      effectivenessFilter === option ? 'bg-gray-100' : ''
                    }`}
                  >
                    {option === 'all' ? 'All Effectiveness' : option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bias Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setBiasDropdown(!showBiasDropdown);
                setShowEffectivenessDropdown(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <IconFilter className="w-4 h-4" />
              Bias
              <IconChevronDown className="w-4 h-4" />
            </button>
            
            {showBiasDropdown && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {biasOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setBiasFilter(option);
                      setBiasDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      biasFilter === option ? 'bg-gray-100' : ''
                    }`}
                  >
                    {option === 'all' ? 'All Bias Levels' : option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Supplement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Outcome</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Effectiveness</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Studies</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Bias</th>
              </tr>
            </thead>
            <tbody>
              {filteredSupplements.map((item, index) => (
                item.outcomes.map((outcome, outcomeIndex) => (
                  <tr 
                    key={`${index}-${outcomeIndex}`}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    {outcomeIndex === 0 ? (
                      <td 
                        className="px-6 py-4" 
                        rowSpan={item.outcomes.length}
                      >
                        {item.supplement}
                      </td>
                    ) : null}
                    <td className="px-6 py-4">{outcome.name}</td>
                    <td className={`px-6 py-4 ${getEffectivenessColor(outcome.effectiveness)}`}>
                      {outcome.effectiveness}
                    </td>
                    <td className="px-6 py-4">
                      <a href="#" className="text-primary hover:underline">
                        {outcome.studies}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      {outcome.bias}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SupplementsPage;
```

# locales\en.js

```js
// locales/en.js
export const enTranslations = {
  siteName: "deDiabetes",
  homeTitle: "Stay Informed About Diabetes",
  homeDescription: "Stay informed about the latest breakthroughs in diabetes care",
  nav: {
    home: "Home",
    interventions: "Interventions",
    outcomes: "Outcomes",
    medications: "Medications",
    supplements: "Supplements",
    premium: "Premium Membership",
    login: "Login / Sign-up",
    search: "Search"
  },
  footer: {
    about: "About us",
    newsletter: "Newsletter",
    archive: "Archive",
    contact: "Contact us"
  },
  // Hero
  hero: {
    stayInformed: "Stay informed.",
    stayAhead: "Stay ahead.",
    subtitle: "Subscribe now for AI-powered insights, the latest breakthroughs, and expert updates in diabetes care—delivered straight to your inbox.",
    emailPlaceholder: "Enter your email",
    subscribeButton: "Subscribe",
    privacyNote: "We respect your privacy. Unsubscribe at any time."
  },
  // introsection homepage
  introSection: {
    headline: "Bringing you the latest advancements in diabetes care and research.",
    subheadline: "Find the latest research, treatments, and insights—all in one place."
  },
  // New interventions translations
  interventions: {
    title: "Interventions Analysis",
    filterPlaceholder: "Filter interventions...",
    effectiveness: "Effectiveness",
    bias: "Bias",
    tableHeaders: {
      intervention: "Intervention",
      outcome: "Outcome",
      effectiveness: "Effectiveness",
      studies: "Studies",
      bias: "Bias"
    },
    filters: {
      allEffectiveness: "All Effectiveness",
      allBias: "All Bias Levels"
    }
  },
  // SearchSection
  searchSection: {
    title: "Search News",
    searchPlaceholder: "Search for news, topics, or keywords...",
    searchButton: "Search",
    filterButton: "FILTER",
    filters: {
      all: "All",
      behavioral: "Behavioral",
      complications: "Complications", 
      digital: "Digital",
      pharmacology: "Pharmacology",
      prevention: "Prevention",
      supplements: "Supplements",
      t1d: "T1D"
    }
  },
  newsGrid: {
    pagination: {
      previous: "Previous",
      next: "Next"
    }
  },
  footer: {
    logoAlt: "deDiabetes Logo",
    about: "About us",
    newsletter: "Newsletter",
    archive: "Archive",
    contact: "Contact us"
  },
};

```

# locales\es.js

```js

// locales/es.js
export const esTranslations = {
  siteName: "deDiabetes",
  homeTitle: "Manténgase Informado Sobre la Diabetes",
  homeDescription: "Manténgase informado sobre los últimos avances en el cuidado de la diabetes",
  nav: {
    home: "Inicio",
    interventions: "Intervenciones",
    outcomes: "Resultados",
    medications: "Medicamentos",
    supplements: "Suplementos",
    premium: "Membresía Premium",
    login: "Iniciar sesión / Registrarse",
    search: "Buscar"
  },
  footer: {
    about: "Sobre nosotros",
    newsletter: "Boletín",
    archive: "Archivo",
    contact: "Contáctenos"
  },
// Hero
hero: {
  stayInformed: "Manténgase informado.",
  stayAhead: "Manténgase adelante.",
  subtitle: "Suscríbase ahora para obtener información impulsada por IA, los últimos avances y actualizaciones de expertos en el cuidado de la diabetes, entregadas directamente a su bandeja de entrada.",
  emailPlaceholder: "Ingrese su correo electrónico",
  subscribeButton: "Suscribirse",
  privacyNote: "Respetamos su privacidad. Puede cancelar la suscripción en cualquier momento."
},
// intro section homepage
introSection: {
  headline: "Trayendo los últimos avances en el cuidado e investigación de la diabetes.",
  subheadline: "Encuentre la investigación más reciente, tratamientos e ideas, todo en un solo lugar."
},

  // New interventions translations
  interventions: {
    title: "Análisis de Intervenciones",
    filterPlaceholder: "Filtrar intervenciones...",
    effectiveness: "Efectividad",
    bias: "Sesgo",
    tableHeaders: {
      intervention: "Intervención",
      outcome: "Resultado",
      effectiveness: "Efectividad", 
      studies: "Estudios",
      bias: "Sesgo"
    },
    filters: {
      allEffectiveness: "Toda Efectividad",
      allBias: "Todos los Niveles de Sesgo"
    }
  },
  // SearchSection
  searchSection: {
    title: "Buscar Noticias",
    searchPlaceholder: "Buscar noticias, temas o palabras clave...",
    searchButton: "Buscar",
    filterButton: "FILTRO",
    filters: {
      all: "Todos",
      behavioral: "Conductual",
      complications: "Complicaciones",
      digital: "Digital",
      pharmacology: "Farmacología",
      prevention: "Prevención",
      supplements: "Suplementos",
      t1d: "T1D"
    }
  },
  newsGrid: {
    pagination: {
      previous: "Anterior",
      next: "Siguiente"
    }
  },
  footer: {
    logoAlt: "Logo de deDiabetes",
    about: "Sobre nosotros",
    newsletter: "Boletín",
    archive: "Archivo",
    contact: "Contáctenos"
  },
};
```

# next.config.js

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
  }
}

module.exports = nextConfig
```

# package.json

```json
{
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
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
import { useTranslations } from '../utils/i18n';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import SearchSection from '../components/SearchSection';
import NewsGrid from '../components/NewsGrid';
import Footer from '../components/Footer';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t } = useTranslations();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{`${t('siteName')} - ${t('homeTitle')}`}</title>
        <meta name="description" content={t('homeDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <IntroSection />
      <SearchSection />
      <NewsGrid />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
```

# pages\interventions.js

```js
import Head from 'next/head';
import InterventionsPage from '../components/InterventionsPage';
import { useTranslations } from '../utils/i18n';

export default function Interventions() {
  const { t } = useTranslations();
  
  return (
    <>
      <Head>
        <title>{t('interventions.title')} - deDiabetes</title>
        <meta 
          name="description" 
          content={t('interventions.filterPlaceholder')} 
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <InterventionsPage />
    </>
  );
}
```

# pages\login.js

```js
import Head from 'next/head';
import { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function Login() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Login - deDiabetes</title>
        <meta name="description" content="Login to your deDiabetes account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-red-600 mb-2">LOGIN NOW</h1>
          <h2 className="text-4xl font-bold text-gray-700 dark:text-gray-200 mb-4">Welcome back</h2>
          <p className="text-xl text-gray-500">Please enter your details</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="email"
              placeholder="Enter your email*"
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password*"
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <IconEyeOff className="w-5 h-5" />
              ) : (
                <IconEye className="w-5 h-5" />
              )}
            </button>
          </div>

          <Link
            href="/forgot-password"
            className="block text-center text-blue-500 hover:text-blue-600 transition-colors"
          >
            Forgot password
          </Link>

          <button
            type="submit"
            className="w-full py-3 bg-rose-100 text-black rounded-md hover:bg-rose-200 transition-colors text-lg font-medium"
          >
            Log in
          </button>

          <Link
            href="/register"
            className="block text-center py-3 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors text-lg font-medium"
          >
            Register now
          </Link>
        </form>
      </main>
      <Footer />
    </div>
  );
}
```

# pages\medications.js

```js
import Head from 'next/head';
import MedicationsPage from '../components/MedicationsPage';

export default function Medications() {
  return (
    <>
      <Head>
        <title>Medications Analysis - deDiabetes</title>
        <meta name="description" content="Analysis of diabetes medications and their outcomes, effectiveness, and potential bias" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <MedicationsPage />
    </>
  );
}
```

# pages\memberpage.js

```js
import React, { useState } from 'react';
import { IconFiles, IconSearch } from '@tabler/icons-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const MemberPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const savedArticles = [
    {
      title: "Novel GLP-1 Receptor Agonist Shows Promising Results in Phase 3 Trial",
      publisher: "Diabetes Obesity & Metabolism",
      id: 1
    },
    {
      title: "Novel GLP-1 Receptor Agonist Shows Promising Results in Phase 3 Trial",
      publisher: "Diabetes Obesity & Metabolism",
      id: 2
    },
    {
      title: "Novel GLP-1 Receptor Agonist Shows Promising Results in Phase 3 Trial",
      publisher: "Diabetes Obesity & Metabolism",
      id: 3
    },
    {
      title: "Novel GLP-1 Receptor Agonist Shows Promising Results in Phase 3 Trial",
      publisher: "Diabetes Obesity & Metabolism",
      id: 4
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-medium text-foreground">Member Page</h1>
        <div><div className="text-xl text-gray-600">[Plan Name]</div>  <div>
        
        <div className="text-xl text-red-600 underline">upgrade/cancel</div>
      </div></div>
        
      </div>
    
      
      {/* Saved Articles Header */}
      <hr className="border-border" />

      <h2 className="text-4xl font-bold text-center m-8">Saved Articles</h2>
      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for news, topics, or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <IconSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
          Search
        </button>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedArticles.map((article) => (
          <div 
            key={article.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-medium mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-4">{article.publisher}</p>
            <button className="text-primary hover:text-primary/80 font-medium">
              View
            </button>
          </div>
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
      <Footer />
    </div>
  );
};

export default MemberPage;
```

# pages\outcomes.js

```js
import Head from 'next/head';
import OutcomesPage from '../components/OutcomesPage';

export default function Outcomes() {
  return (
    <>
      <Head>
        <title>Outcomes Analysis - deDiabetes</title>
        <meta name="description" content="Analysis of diabetes outcomes and their related interventions, effectiveness, and potential bias" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <OutcomesPage />
    </>
  );
}
```

# pages\postprismic.js

```js
import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import PostTemplate from '../components/PostTemplate';
import ArticleTemplate from '../components/ArticleTemplate';

export default function ArtificialPancreasTrialPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Common data used by both templates
  const commonData = {
    title: "Long-term Outcomes of Artificial Pancreas Systems: A 24-Month Multi-Center Trial",
    publishDate: "January 31, 2025",
    publisher: "Diabetes Care Journal",
    author: "Dr. Sarah Johnson",
    readTime: "8 min read",
  };

  // Related posts data used by both templates
  const relatedPosts = [
    {
      title: "Impact of CGM Systems on Quality of Life: A 12-Month Study",
      date: "January 25, 2025",
      description: "A comprehensive analysis of how continuous glucose monitoring systems affect daily living, stress levels, and overall patient satisfaction in type 1 diabetes management.",
      slug: "cgm-quality-of-life-study"
    },
    {
      title: "Comparing Smart Insulin Pens vs Traditional Insulin Delivery",
      date: "January 28, 2025",
      description: "New research evaluates the effectiveness of smart insulin pens against conventional methods, examining glycemic control and user experience outcomes.",
      slug: "smart-insulin-pens-comparison"
    },
    {
      title: "Machine Learning in Diabetes Care: Predictive Analytics",
      date: "January 30, 2025",
      description: "How artificial intelligence and machine learning algorithms are revolutionizing blood glucose prediction and personalized treatment recommendations.",
      slug: "ml-diabetes-predictive-analytics"
    }
  ];

  // Specify the source type: 'article' or 'post'
  const source_type = 'article'; // You can change this to 'post' to switch templates

  // Template-specific data
  const articleData = {
    ...commonData,
    subtitle: "A comprehensive analysis of automated insulin delivery systems",
    imageUrl: null,
    imageCaption: "Artificial Pancreas System Components Diagram",
    relatedPosts,
    content: (
      <>
        <h2>Abstract</h2>
        <p>
          This groundbreaking study examines the long-term efficacy and safety of artificial 
          pancreas systems in managing type 1 diabetes over a 24-month period. The research 
          demonstrates significant improvements in glycemic control and quality of life for 
          participants.
        </p>

        <h2>Introduction</h2>
        <p>
          Artificial pancreas systems represent a significant advancement in diabetes 
          management, combining continuous glucose monitoring with automated insulin delivery. 
          This study provides crucial long-term data on their effectiveness in real-world 
          settings.
        </p>

        <h2>Methodology</h2>
        <p>
          The study employed a rigorous methodological framework to ensure data reliability and validity. 
          Participants were randomly assigned to treatment groups using a computer-generated algorithm.
        </p>

        <h2>Results and Discussion</h2>
        <p>
          The 24-month trial demonstrated significant clinical benefits of the artificial 
          pancreas system. Key findings include a 35% reduction in hypoglycemic events and 
          a 28% improvement in time-in-range glucose levels compared to the control group.
        </p>

        <h2>Conclusion</h2>
        <p>
          Our findings provide strong evidence supporting the long-term efficacy of artificial 
          pancreas systems in improving glycemic control and reducing the burden of diabetes 
          management for patients with type 1 diabetes.
        </p>
      </>
    )
  };

  const postData = {
    ...commonData,
    summary: "A comprehensive 24-month trial evaluating artificial pancreas systems shows promising results for type 1 diabetes management.",
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
    methodology: "This landmark study implemented a comprehensive methodological framework...",
    interventions: "The artificial pancreas system utilized in this study combined...",
    keyFindings: "The 24-month trial demonstrated significant clinical benefits...",
    comparison: "Compared to previous studies, our findings show...",
    biasScore: "Moderate",
    effectivenessAnalysis: {
      intervention: "AI-Driven Monitoring",
      effectiveness: "Moderate"
    },
    journalReference: {
      full: "Smith J, et al. Long-term Outcomes of Artificial Pancreas Systems. Diabetes Care. 2025;15(3):125-140."
    },
    expertCards: [
      {
        title: "Expert Analysis of AID Systems",
        outboundLink: "https://example.com/expert-analysis",
        author: "Dr. Sarah Chen"
      }
    ],
    onlineCards: [],
    redditCards: [],
    studyCards: [],
    xCards: [],
    youtubeCards: [],
    relatedPosts
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{commonData.title} - Dexdiabetes</title>
        <meta 
          name="description" 
          content="Latest results from a 24-month trial of an artificial pancreas system showing significant improvements in glycemic control." 
        />
      </Head>

      {source_type === 'article' ? (
        <ArticleTemplate 
          {...articleData}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      ) : (
        <>
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <main>
            <article>
              <PostTemplate {...postData} />
            </article>
          </main>
        </>
      )}
    </div>
  );
}
```

# pages\premium.js

```js
// pages/premium.js
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { IconCrown, IconCheck,IconBackground } from '@tabler/icons-react';
import Footer from '../components/Footer';

export default function Premium() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [billingCycle, setBillingCycle] = useState('yearly'); // yearly or monthly

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const basicFeatures = [
    { name: 'Zero Advertisement', included: true },
    { name: 'No tracking', included: true },
    { name: 'Bookmark content', included: true },
    { name: 'Research news summaries', included: true },
    { name: 'Related curated online content', included: true },
  ];

  const premiumFeatures = [
    { name: 'Advanced search and filter functionality', included: true },
    { name: 'Dark mode', included: true },
    { name: 'Expanded research information', included: true },
    { name: 'Interventions effectiveness score', included: true },
    { name: 'Bias analysis using applicable Cochrane Collaboration tools', included: true },
  ];

  const monthlyPrice = 3.0;
  const yearlyDiscount = 0.25; // 25% discount
  const yearlyPrice = monthlyPrice * 12 * (1 - yearlyDiscount);

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Premium Membership - deDiabetes</title>
        <meta name="description" content="Upgrade to Premium - Access advanced features and comprehensive diabetes research" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Easy, smart, and always the right choice
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One plan for full access and advanced search, empowering evidence-based diabetes care
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-secondary/10 rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="border border-border rounded-lg p-8 bg-background">
            <div className="flex items-center gap-2 mb-4">
              <IconBackground className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Basic</h2>
            </div>
            <p className="text-muted-foreground mb-4">A clean experience</p>
            <div className="mb-8">
              <span className="text-4xl font-bold">Free</span>
            </div>
            <div className="space-y-4 mb-8">
              <p className="font-medium">Basic includes...</p>
              {basicFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-primary rounded-lg p-8 bg-background relative">
            <div className="absolute -top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm">
              Yearly -25%
            </div>
            <div className="flex items-center gap-2 mb-4">
              <IconCrown className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Premium</h2>
            </div>
            <p className="text-muted-foreground mb-4">Full features</p>
            <div className="mb-8">
              <span className="text-4xl font-bold">
                ${billingCycle === 'yearly' ? (yearlyPrice / 12).toFixed(2) : monthlyPrice.toFixed(2)}
              </span>
              <span className="text-muted-foreground">/month</span>
              <p className="text-sm text-muted-foreground">
                (billed {billingCycle === 'yearly' ? 'yearly' : 'monthly'})
              </p>
            </div>
            <div className="space-y-4 mb-8">
              <p className="font-medium">Everything in Basic plus...</p>
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
            <button
              className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Subscribe and pay
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

# pages\register.js

```js
// pages/register.js
import Head from 'next/head';
import { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function Register() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Register - deDiabetes</title>
        <meta name="description" content="Create your deDiabetes account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-red-600 mb-2">REGISTER NOW</h1>
          <h2 className="text-4xl font-bold text-gray-700 dark:text-gray-200 mb-4">Create account</h2>
          <p className="text-xl text-gray-500">Please enter your details</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="text"
              placeholder="Full name*"
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email address*"
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password*"
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <IconEyeOff className="w-5 h-5" />
              ) : (
                <IconEye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password*"
              className="w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <IconEyeOff className="w-5 h-5" />
              ) : (
                <IconEye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-lg font-medium"
          >
            Create account
          </button>

          <p className="text-center text-gray-500">
            Already registered?{' '}
            <Link
              href="/login"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Login here
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}
```

# pages\subandpay_m.js

```js
import React, { useState } from 'react';
import { IconCrown, IconCheck } from '@tabler/icons-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SubandPay = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Subscription Details */}
          <div className="bg-rose-50 p-8 rounded-lg">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-4">Subscribe to Premium</h1>
              <div className="text-3xl font-bold mb-2">
                $3.00 <span className="text-lg font-normal text-gray-600">per month</span>
              </div>
              <a href="/subandpay_y" className="text-rose-600 underline font-medium hover:text-rose-700 transition-colors">Save 25% with yearly billing</a>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="font-semibold text-lg">Premium features include:</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Advanced search and filter functionality</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Dark mode</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Expanded research information</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Interventions effectiveness score</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Bias analysis using Cochrane tools</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Contact information</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className="w-full bg-[#ffc439] text-[#003087] py-3 rounded-md font-bold flex items-center justify-center"
                  >
                    <span>Pay with PayPal</span>
                  </button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card number
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiration
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                Place Order
              </button>

              <p className="text-sm text-gray-500 text-center">
                By clicking Place Order you agree to the Terms & Conditions.
                All payments for Paid Services are final and non-refundable.
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubandPay;
```

# pages\subandpay_y.js

```js
import React, { useState } from 'react';
import { IconCrown, IconCheck } from '@tabler/icons-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SubandPay = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Subscription Details */}
          <div className="bg-rose-50 p-8 rounded-lg">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-4">Subscribe to Premium</h1>
              <div className="text-3xl font-bold mb-2">
                $36.00 <span className="text-lg font-normal text-gray-600">per year</span>
              </div>
              <div className="text-rose-600 font-medium">Save 25% with yearly billing</div>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="font-semibold text-lg">Premium features include:</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Advanced search and filter functionality</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Dark mode</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Expanded research information</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Interventions effectiveness score</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Bias analysis using Cochrane tools</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Contact information</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className="w-full bg-[#ffc439] text-[#003087] py-3 rounded-md font-bold flex items-center justify-center"
                  >
                    <span>Pay with PayPal</span>
                  </button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card number
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiration
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                Place Order
              </button>

              <p className="text-sm text-gray-500 text-center">
                By clicking Place Order you agree to the Terms & Conditions.
                All payments for Paid Services are final and non-refundable.
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubandPay;
```

# pages\supplements.js

```js
import Head from 'next/head';
import SupplementsPage from '../components/SupplementsPage';

export default function Supplements() {
  return (
    <>
      <Head>
        <title>Supplements Analysis - deDiabetes</title>
        <meta name="description" content="Analysis of diabetes supplements and their outcomes, effectiveness, and potential bias" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <SupplementsPage />
    </>
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

# utils\i18n.js

```js
// utils/i18n.js
import { useRouter } from 'next/router';
import { enTranslations } from '../locales/en';
import { esTranslations } from '../locales/es';

const translations = {
  en: enTranslations,
  es: esTranslations
};

export const useTranslations = () => {
  const router = useRouter();
  const { locale = 'en', defaultLocale = 'en' } = router;

  const t = (key) => {
    const currentTranslations = translations[locale] || translations[defaultLocale];
    const keys = key.split('.');
    let result = currentTranslations;
    
    for (const k of keys) {
      result = result?.[k];
      if (!result) {
        // If translation is not found, return last part of the key
        return keys[keys.length - 1];
      }
    }

    return result;
  };

  const changeLanguage = (newLocale) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return {
    t,
    locale,
    changeLanguage
  };
};
```

