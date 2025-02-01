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