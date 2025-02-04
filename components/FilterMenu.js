import React, { useState } from 'react';
import { IconChevronDown, IconChevronUp, IconX, IconSearch } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';

const FilterMenu = ({ isOpen, onClose }) => {
  const { t } = useTranslations();
  const [openSection, setOpenSection] = useState(null);
  const [searchOutcomes, setSearchOutcomes] = useState('');
  const [searchInterventions, setSearchInterventions] = useState('');

  const outcomes = t('filterMenu.sections.outcomes.items');
  const interventions = t('filterMenu.sections.interventions.items');

  const filteredOutcomes = outcomes.filter(outcome =>
    outcome.toLowerCase().includes(searchOutcomes.toLowerCase())
  );

  const filteredInterventions = interventions.filter(intervention =>
    intervention.toLowerCase().includes(searchInterventions.toLowerCase())
  );

  const SearchableGrid = ({ items, searchValue, onSearchChange, placeholder }) => (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-border rounded-md bg-background"
        />
        <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      </div>
      <div className="grid grid-cols-2 border border-border">
        {items.map((item, index) => (
          <label
            key={index}
            className="contents"
          >
            <div className="flex items-start border-b border-r border-border p-3">
              <input
                type="checkbox"
                className="mr-2 mt-1.5 flex-shrink-0"
              />
              <span className="text-sm whitespace-normal">{item}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const menuItems = [
    {
      title: t('filterMenu.sections.outcomes.title'),
      content: (
        <SearchableGrid
          items={filteredOutcomes}
          searchValue={searchOutcomes}
          onSearchChange={setSearchOutcomes}
          placeholder={t('filterMenu.searchPlaceholders.outcomes')}
        />
      )
    },
    {
      title: t('filterMenu.sections.interventions.title'),
      content: (
        <SearchableGrid
          items={filteredInterventions}
          searchValue={searchInterventions}
          onSearchChange={setSearchInterventions}
          placeholder={t('filterMenu.searchPlaceholders.interventions')}
        />
      )
    },
    {
      title: t('filterMenu.sections.participants.title'),
      children: t('filterMenu.sections.participants.items')
    },
    {
      title: t('filterMenu.sections.trialType.title'),
      children: t('filterMenu.sections.trialType.items')
    },
    {
      title: t('filterMenu.sections.trialSize.title'),
      children: t('filterMenu.sections.trialSize.items')
    },
    {
      title: t('filterMenu.sections.trialDuration.title'),
      children: t('filterMenu.sections.trialDuration.items')
    },
    {
      title: t('filterMenu.sections.geography.title'),
      children: t('filterMenu.sections.geography.items')
    },
    {
      title: t('filterMenu.sections.year.title'),
      children: t('filterMenu.sections.year.items')
    },
    {
      title: t('filterMenu.sections.sponsorship.title'),
      children: t('filterMenu.sections.sponsorship.items')
    }
  ];

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-80 bg-background border-l border-border transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="h-full overflow-y-auto">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="font-semibold">{t('filterMenu.title')}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary/10 rounded-full"
            aria-label={t('filterMenu.closeMenu')}
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b border-border last:border-0">
              <button
                onClick={() => setOpenSection(openSection === index ? null : index)}
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
                <div className="px-3 py-2 bg-secondary/5">
                  {item.content || (
                    <div className="space-y-2">
                      {item.children.map((child, childIndex) => (
                        <label
                          key={childIndex}
                          className="flex items-center hover:bg-secondary/10 px-3 py-1 rounded"
                        >
                          <input
                            type="checkbox"
                            className="mr-2"
                          />
                          <span className="text-sm text-muted-foreground">{child}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <button
            className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            {t('filterMenu.applyFilters')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;