import React from 'react';
import Link from 'next/link';
import { 
  Home,
  Hands,
  Heart,
  Shield,
  Smartphone,
  Pills,
  Microscope,
  Timer,
  Search,
  LogIn
} from 'lucide-react';

const MenuItem = ({ icon: Icon, text, href = '/' }) => (
  <Link 
    href={href}
    className="flex items-center gap-3 px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/10 rounded-lg transition-colors"
  >
    <Icon className="w-5 h-5" />
    <span className="text-lg">{text}</span>
  </Link>
);

const NavMenu = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`fixed inset-y-0 left-0 w-72 bg-background border-r border-border transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50`}
    >
      <div className="h-full flex flex-col py-6">
        <nav className="flex-1 space-y-1">
          <MenuItem icon={Home} text="Home" href="/" />
          <MenuItem icon={Hands} text="Behavioral Intervention" href="/behavioral" />
          <MenuItem icon={Heart} text="Diabetes Complications" href="/complications" />
          <MenuItem icon={Shield} text="Diabetes Prevention" href="/prevention" />
          <MenuItem icon={Smartphone} text="Digital Health" href="/digital" />
          <MenuItem icon={Pills} text="Pharmacology" href="/pharmacology" />
          <MenuItem icon={Microscope} text="Precision Medicine" href="/precision" />
          <MenuItem icon={Timer} text="T1D Cure Research" href="/t1d-research" />
          <MenuItem icon={Search} text="Search" href="/search" />
        </nav>
        
        {/* Divider */}
        <div className="h-px bg-border my-4" />
        
        {/* Login/Sign-up at bottom */}
        <div className="px-4">
          <MenuItem icon={LogIn} text="Login / Sign-up" href="/auth" />
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
    </div>
  );
};

export default NavMenu;