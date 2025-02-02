import React, { useState } from 'react';
import { 
  IconMenu2, 
  IconSearch, 
  IconSun, 
  IconMoon,
  IconHome2,
  IconHandRock,
  IconHeartFilled,
  IconShieldFilled,
  IconDeviceMobile,
  IconPills,
  IconMicroscope,
  IconClock,
  IconLogin,
  IconX
} from '@tabler/icons-react';

const MenuItem = ({ icon: Icon, text, href = '/' }) => (
  <a 
    href={href}
    className="flex items-center gap-3 px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/10 rounded-lg transition-colors"
  >
    <Icon className="w-5 h-5" />
    <span className="text-lg whitespace-nowrap">{text}</span>
  </a>
);

export default function Navbar({ isDarkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'EN' ? 'ES' : 'EN');
  };

  // Navigation menu component
  const NavigationMenu = () => (
    <div 
      className={`absolute top-0 right-12 bg-background border border-border rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      } z-40 w-full sm:w-auto sm:min-w-[300px]`}
    >
      <div className="p-4">
        <nav className="space-y-1">
          <MenuItem icon={IconHome2} text="Home" href="/" />
          <MenuItem icon={IconHandRock} text="Behavioral Intervention" href="/behavioral" />
          <MenuItem icon={IconHeartFilled} text="Diabetes Complications" href="/complications" />
          <MenuItem icon={IconShieldFilled} text="Diabetes Prevention" href="/prevention" />
          <MenuItem icon={IconDeviceMobile} text="Digital Health" href="/digital" />
          <MenuItem icon={IconPills} text="Pharmacology" href="/pharmacology" />
          <MenuItem icon={IconMicroscope} text="Precision Medicine" href="/precision" />
          <MenuItem icon={IconClock} text="T1D Cure Research" href="/t1d-research" />
          <MenuItem icon={IconSearch} text="Search" href="/search" />
        </nav>
        
        {/* Divider */}
        <div className="h-px bg-border my-4" />
        
        {/* Login/Sign-up at bottom */}
        <div>
          <MenuItem icon={IconLogin} text="Login / Sign-up" href="/auth" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <nav className="relative border-b border-border bg-background z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="hover:opacity-90 transition-opacity">
                <img
                  src="/logo1.png"
                  alt="DeXdiabetes Logo"
                  className="h-8 w-auto"
                />
              </a>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 rounded-md border border-border hover:bg-secondary/10 text-foreground text-sm font-medium transition-colors"
                aria-label="Toggle language"
              >
                {currentLanguage}
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
                <NavigationMenu />
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