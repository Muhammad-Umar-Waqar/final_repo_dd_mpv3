import React from 'react';
import { IconChevronDown, IconChevronUp, IconX } from '@tabler/icons-react';

const FilterMenu = ({ isOpen, onClose }) => {
  const [openSection, setOpenSection] = React.useState(null);

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

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-64 bg-background border-l border-border transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="h-full overflow-y-auto">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary/10 rounded-full"
            aria-label="Close menu"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b border-border last:border-0">
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-3 py-2 flex justify-between items-center text-foreground hover:text-primary hover:bg-secondary/10"
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
                    <label
                      key={childIndex}
                      className="block px-3 py-1 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/10"
                    >
                      <input
                        type="checkbox"
                        className="mr-2"
                      />
                      {child}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;