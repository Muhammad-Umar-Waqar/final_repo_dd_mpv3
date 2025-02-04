import React, { useState } from 'react';
import Footer from './Footer';
import { IconChevronDown, IconFilter } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';
import { useDarkMode } from '../utils/DarkModeContext';

const InterventionsPage = () => {
  const [filterText, setFilterText] = useState('');
  const [effectivenessFilter, setEffectivenessFilter] = useState('all');
  const [biasFilter, setBiasFilter] = useState('all');
  const [showEffectivenessDropdown, setShowEffectivenessDropdown] = useState(false);
  const [showBiasDropdown, setBiasDropdown] = useState(false);
  const { t } = useTranslations();
  const { isDarkMode } = useDarkMode();

  const interventionsData = [
    {
      intervention: 'Continuous Glucose Monitoring',
      outcomes: [
        { name: 'Glycemic Control', effectiveness: 'High', studies: 25, bias: 'Low' },
        { name: 'Quality of Life', effectiveness: 'Med', studies: 18, bias: 'Low' },
        { name: 'Hypoglycemia Prevention', effectiveness: 'High', studies: 22, bias: 'Low' },
      ]
    },
    {
      intervention: 'Insulin Pump Therapy',
      outcomes: [
        { name: 'Blood Sugar Control', effectiveness: 'High', studies: 30, bias: 'Low' },
        { name: 'Patient Satisfaction', effectiveness: 'High', studies: 15, bias: 'Medium' },
        { name: 'Treatment Adherence', effectiveness: 'Med', studies: 12, bias: 'Medium' },
      ]
    },
    {
      intervention: 'Dietary Modification',
      outcomes: [
        { name: 'HbA1c Reduction', effectiveness: 'Med', studies: 20, bias: 'Moderate' },
        { name: 'Weight Management', effectiveness: 'Med', studies: 16, bias: 'Medium' },
        { name: 'Cardiovascular Health', effectiveness: 'High', studies: 14, bias: 'Low' },
      ]
    }
  ];

  const filteredInterventions = interventionsData
    .map(intervention => ({
      ...intervention,
      outcomes: intervention.outcomes.filter(outcome => {
        const matchesSearch = intervention.intervention.toLowerCase().includes(filterText.toLowerCase()) ||
                           outcome.name.toLowerCase().includes(filterText.toLowerCase());
        const matchesEffectiveness = effectivenessFilter === 'all' || outcome.effectiveness === effectivenessFilter;
        const matchesBias = biasFilter === 'all' || outcome.bias === biasFilter;
        return matchesSearch && matchesEffectiveness && matchesBias;
      })
    }))
    .filter(intervention => intervention.outcomes.length > 0);

  const getEffectivenessColor = (effectiveness) => {
    const colorMap = {
      high: {
        light: 'text-green-600',
        dark: 'text-green-400'
      },
      med: {
        light: 'text-yellow-600',
        dark: 'text-yellow-400'
      },
      low: {
        light: 'text-red-600',
        dark: 'text-red-400'
      },
      default: {
        light: 'text-gray-600',
        dark: 'text-gray-400'
      }
    };

    const effectKey = effectiveness.toLowerCase();
    const colorSet = colorMap[effectKey] || colorMap.default;
    
    // Use CSS classes that respond to dark mode instead of JS-based switching
    return `${colorSet.light} dark:${colorSet.dark}`;
  };

  const effectivenessOptions = ['all', 'High', 'Med', 'Low'];
  const biasOptions = ['all', 'Low', 'Medium', 'Moderate'];

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">{t('interventions.title')}</h1>
      
      {/* Search and Filters Row */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        {/* Search Input */}
        <div className="flex-grow max-w-md">
          <input
            type="text"
            placeholder={t('interventions.filterPlaceholder')}
            className="w-full px-4 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        {/* Effectiveness Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowEffectivenessDropdown(!showEffectivenessDropdown);
              setBiasDropdown(false);
            }}
            className="px-4 py-2 border border-input bg-background rounded-md flex items-center gap-2 hover:bg-accent"
          >
            <IconFilter className="w-4 h-4" />
            {t('interventions.effectiveness')}
            <IconChevronDown className="w-4 h-4" />
          </button>
          
          {showEffectivenessDropdown && (
            <div className="absolute top-full mt-1 w-48 bg-background border border-input rounded-md shadow-lg z-10">
              {effectivenessOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setEffectivenessFilter(option);
                    setShowEffectivenessDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-accent ${
                    effectivenessFilter === option ? 'bg-accent/50' : ''
                  }`}
                >
                  {option === 'all' ? t('interventions.filters.allEffectiveness') : option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bias Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setBiasDropdown(!showBiasDropdown);
              setShowEffectivenessDropdown(false);
            }}
            className="px-4 py-2 border border-input bg-background rounded-md flex items-center gap-2 hover:bg-accent"
          >
            <IconFilter className="w-4 h-4" />
            {t('interventions.bias')}
            <IconChevronDown className="w-4 h-4" />
          </button>
          
          {showBiasDropdown && (
            <div className="absolute top-full mt-1 w-48 bg-background border border-input rounded-md shadow-lg z-10">
              {biasOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setBiasFilter(option);
                    setBiasDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-accent ${
                    biasFilter === option ? 'bg-accent/50' : ''
                  }`}
                >
                  {option === 'all' ? t('interventions.filters.allBias') : option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-input">
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('interventions.tableHeaders.intervention')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('interventions.tableHeaders.outcome')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('interventions.tableHeaders.effectiveness')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('interventions.tableHeaders.studies')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('interventions.tableHeaders.bias')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredInterventions.map((item, index) => (
              item.outcomes.map((outcome, outcomeIndex) => (
                <tr 
                  key={`${index}-${outcomeIndex}`}
                  className="border-b border-input hover:bg-accent/50"
                >
                  {outcomeIndex === 0 ? (
                    <td 
                      className="px-6 py-4" 
                      rowSpan={item.outcomes.length}
                    >
                      {item.intervention}
                    </td>
                  ) : null}
                  <td className="px-6 py-4">{outcome.name}</td>
                  <td className={`px-6 py-4 ${getEffectivenessColor(outcome.effectiveness)}`}>
                    {outcome.effectiveness}
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="text-primary hover:underline">
                      {outcome.studies}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    {outcome.bias}
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};

export default InterventionsPage;