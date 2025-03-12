import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from '../utils/i18n';
import ThemeToggle from './ThemeToggle';
import {
  IconMenu2,
  IconSearch,
  IconLayoutDashboard ,
  IconHome2,
  IconClipboardHeart,
  IconHeartFilled,
  IconVaccineBottle,
  IconFeatherFilled,
  IconCrown,
  IconLogin,
  IconX,
  IconArticleFilled
} from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';

// Updated MenuItem component to handle onClick if provided
const MenuItem = ({ icon: Icon, text, href = '/', onClick }) => {
  const router = useRouter();
  const { locale } = router;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/10 rounded-lg transition-colors"
      >
        <Icon className="w-5 h-5" />
        <span className="text-lg whitespace-nowrap">{text}</span>
      </button>
    );
  }

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


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, locale, changeLanguage } = useTranslations();
  const { data: session } = useSession();
 
  const membershipHref = session?.user?.role === "premium" ? "/membership-premium" : "/premium";
  const adminHref = session?.user?.role === "admin" ? "/dashboard" : "/404";
  console.log("SESSION>", session);
  
  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    changeLanguage(newLocale);
  };

  const getDisplayLanguage = (locale) => {
    return locale?.startsWith('en') ? 'EN' : 'ES';
  };

 
  const [mounted, setMounted] = useState(false);

  // Set mounted to true once the component has mounted (client-side)
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <nav className="relative border-b border-border bg-background z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" locale={locale} className="hover:opacity-90 transition-opacity">
                <img
                  src="/logo1.png"
                  alt="Dediabetes Logo"
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
                {getDisplayLanguage(locale)}
              </button>

              <Link
                className="p-2 rounded-full hover:bg-secondary text-foreground"
                aria-label="Search"
                href="/archive"
              >
                <IconSearch className="w-5 h-5" />
              </Link>

              <ThemeToggle />

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
                  className={`absolute top-0 right-[3.5rem] sm:right-16 bg-background border border-border rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    } z-40 w-[calc(100vw-5rem)] sm:w-auto sm:min-w-[300px] max-w-[280px] sm:max-w-none mx-2 sm:mx-0`}
                >
                  <div className="p-4">
                    <nav className="space-y-1">
                    {mounted && session?.user?.role === "admin" && (
                    <MenuItem icon={IconLayoutDashboard} text={t('nav.dashboard')} href={adminHref} />
                  )}

                      <MenuItem icon={IconHome2} text={t('nav.home')} href="/" />
                      <MenuItem icon={IconClipboardHeart} text={t('nav.interventions')} href="/interventions" />
                      <MenuItem icon={IconHeartFilled} text={t('nav.outcomes')} href="/outcomes" />
                      <MenuItem icon={IconVaccineBottle} text={t('nav.medications')} href="/medications" />
                      <MenuItem icon={IconFeatherFilled} text={t('nav.supplements')} href="/supplements" />
                      <MenuItem icon={IconArticleFilled} text={t('nav.articles')} href="/articles" />
                    </nav>

                    <div className="h-px bg-border my-4" />



                    <div>
                      <MenuItem icon={IconCrown} text={t('nav.premium')} href={membershipHref}  />
                      {/* <MenuItem icon={IconLogin} text={t('nav.login')} href="/login" /> */}
                      { mounted && session ? (
                       <button
                       onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
                       className="w-full flex items-center gap-3 px-4 py-2 rounded-md  hover:bg-teal-50 transition"
                     >
                       <IconLogin className="w-5 h-5 text-zinc-500" /> 
                       <span className='text-lg text-zinc-500'>{t('nav.logout')}</span>
                     </button>
                     
                      ) : (
                        <MenuItem icon={IconLogin} text={t('nav.login')} href="/login" />
                      )}
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





