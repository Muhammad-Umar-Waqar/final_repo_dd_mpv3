// components/NavMenu.js
import React from 'react';
import Link from 'next/link';
import { 
  IconHome2,
  IconHeartFilled,
  IconVaccineBottle,
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