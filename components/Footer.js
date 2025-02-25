// components/Footer.js
import Link from 'next/link';
import { useTranslations } from '../utils/i18n';
import { IconUsers, IconMail, IconArchive, IconMessageCircle, IconRss } from '@tabler/icons-react';

const Footer = () => {
  const { t } = useTranslations();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="flex items-center justify-center">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <img
                src="/logo1.png"
                alt={t('footer.logoAlt')}
                className="h-6 sm:h-8 w-auto"
              />
            </Link>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            <Link 
              href="/about"
              className="flex items-center gap-1.5 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconUsers className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{t('footer.about')}</span>
            </Link>
            
            <Link 
              href="/newsletter"
              className="flex items-center gap-1.5 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconMail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{t('footer.newsletter')}</span>
            </Link>
            
            <Link 
              href="/archive"
              className="flex items-center gap-1.5 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconArchive className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{t('footer.archive')}</span>
            </Link>
            
            <Link 
              href="/contact"
              className="flex items-center gap-1.5 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconMessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{t('footer.contact')}</span>
            </Link>

            <Link
              href="/feed.xml"
              className="flex items-center gap-1.5 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconRss className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">RSS</span>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;