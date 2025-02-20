import React from 'react';
import Link from 'next/link';
import { IconHome } from '@tabler/icons-react';
import { useTranslations } from '../../utils/i18n';

const NotFoundState = () => {
  const { t } = useTranslations();

  return (
    <div className="bg-background flex items-center justify-center">
      <div className="max-w-sm mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
          404
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          {t('notFound.description')}
        </p>

        <Link 
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <IconHome className="w-5 h-5" />
          {t('notFound.homeButton')}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundState; 