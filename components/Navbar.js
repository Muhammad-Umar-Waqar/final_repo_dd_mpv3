import React from 'react';
import { IconMenu2, IconSearch, IconSun, IconMoon } from '@tabler/icons-react';
import Image from 'next/image';

export default function Navbar({ isDarkMode, toggleDarkMode }) {
  return (
    <nav className="border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo1.png"
              alt="DeXdiabetes Logo"
              width={150}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-4">
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
              className="p-2 rounded-full hover:bg-secondary text-foreground"
              aria-label="Menu"
            >
              <IconMenu2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}