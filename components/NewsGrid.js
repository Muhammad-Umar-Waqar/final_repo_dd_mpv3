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