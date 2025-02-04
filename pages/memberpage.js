import React, { useState } from 'react';
import { IconFiles, IconSearch } from '@tabler/icons-react';
import Footer from '../components/Footer';
import { useTranslations } from '../utils/i18n';

const MemberPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslations();

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-medium text-foreground">{t('memberPage.title')}</h1>
        <div>
          <div className="text-xl text-gray-600">[Plan Name]</div>
          <div className="text-xl text-red-600 underline">
            {t('memberPage.planSection.upgrade')}
          </div>
        </div>
      </div>
    
      <hr className="border-border" />

      <h2 className="text-4xl font-bold text-center m-8">{t('memberPage.savedArticles.title')}</h2>
      
      <div className="relative mb-8">
        <input
          type="text"
          placeholder={t('memberPage.savedArticles.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <IconSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
          {t('memberPage.savedArticles.searchButton')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedArticles.map((article) => (
          <div 
            key={article.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-medium mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-4">{article.publisher}</p>
            <button className="text-primary hover:text-primary/80 font-medium">
              {t('memberPage.savedArticles.viewButton')}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-2 mt-12">
        <button className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
          {t('memberPage.pagination.previous')}
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
          {t('memberPage.pagination.next')}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default MemberPage;