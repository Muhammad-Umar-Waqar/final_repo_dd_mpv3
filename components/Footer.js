// components/Footer.js
import Link from 'next/link';
import { useTranslations } from '../utils/i18n';
import { IconUsers, IconMail, IconArchive, IconMessageCircle, IconRss } from '@tabler/icons-react';

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

              <Link
                href="/feed.xml"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <IconRss className="w-5 h-5" />
                <span>RSS</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;