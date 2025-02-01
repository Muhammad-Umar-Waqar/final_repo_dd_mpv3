import React, { useState } from 'react';
import { 
  IconMenu2, 
  IconSearch, 
  IconSun, 
  IconMoon, 
  IconX, 
  IconChevronDown, 
  IconChevronUp 
} from '@tabler/icons-react';
import Image from 'next/image';

const menuItems = [
  {
    title: 'OUTCOMES',
    children: ['Clinical Outcomes', 'Safety Outcomes', 'Patient-Reported Outcomes']
  },
  {
    title: 'INTERVENTIONS',
    children: ['Drug Interventions', 'Device Interventions', 'Behavioral Interventions']
  },
  {
    title: 'PARTICIPANTS',
    children: ['Inclusion Criteria', 'Exclusion Criteria', 'Demographics']
  },
  {
    title: 'TRIAL TYPE',
    children: ['Randomized', 'Non-Randomized', 'Observational']
  },
  {
    title: 'TRIAL SIZE',
    children: ['Small (<100)', 'Medium (100-500)', 'Large (>500)']
  },
  {
    title: 'TRIAL DURATION',
    children: ['Short-term', 'Medium-term', 'Long-term']
  },
  {
    title: 'GEOGRAPHY',
    children: ['North America', 'Europe', 'Asia', 'Other Regions']
  },
  {
    title: 'YEAR',
    children: ['2024', '2023', '2022', 'Earlier']
  },
  {
    title: 'SPONSORSHIP',
    children: ['Industry', 'Government', 'Academic', 'Other']
  }
];

export default function Navbar({ isDarkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

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
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <IconX className="w-5 h-5" />
              ) : (
                <IconMenu2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 w-full md:w-64 bg-background border-b border-l border-border shadow-lg">
            <div className="p-2">
              {menuItems.map((item, index) => (
                <div key={index} className="border-b border-border last:border-0">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full px-3 py-2 flex justify-between items-center text-foreground hover:text-primary hover:bg-secondary/50"
                  >
                    <span>{item.title}</span>
                    {openSection === index ? (
                      <IconChevronUp className="w-4 h-4" />
                    ) : (
                      <IconChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  
                  {openSection === index && (
                    <div className="pl-6 space-y-2 py-2 bg-secondary/10">
                      {item.children.map((child, childIndex) => (
                        <a
                          key={childIndex}
                          href="#"
                          className="block px-3 py-1 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50"
                        >
                          {child}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="#"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-secondary/50 font-semibold mt-2"
              >
                APPLY (#) →
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}