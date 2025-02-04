import React, { useState } from 'react';
import { useDarkMode } from '../utils/DarkModeContext';
import Footer from './Footer';
import { IconChevronDown, IconFilter } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';

const OutcomesPage = () => {
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslations();
  const [filterText, setFilterText] = useState('');
  const [effectivenessFilter, setEffectivenessFilter] = useState('all');
  const [biasFilter, setBiasFilter] = useState('all');
  const [showEffectivenessDropdown, setShowEffectivenessDropdown] = useState(false);
  const [showBiasDropdown, setBiasDropdown] = useState(false);

  const outcomesData = [
    {
      outcome: 'Glycemic Control',
      interventions: [
        { name: 'Continuous Glucose Monitoring', effectiveness: 'High', studies: 25, bias: 'Low' },
        { name: 'Insulin Pump Therapy', effectiveness: 'High', studies: 30, bias: 'Low' },
        { name: 'Carbohydrate Counting', effectiveness: 'Med', studies: 15, bias: 'Medium' }
      ]
    },
    {
      outcome: 'Quality of Life',
      interventions: [
        { name: 'Diabetes Education Program', effectiveness: 'High', studies: 20, bias: 'Low' },
        { name: 'Support Group Participation', effectiveness: 'Med', studies: 12, bias: 'Medium' },
        { name: 'Telehealth Monitoring', effectiveness: 'High', studies: 18, bias: 'Low' }
      ]
    },
    {
      outcome: 'Hypoglycemia Prevention',
      interventions: [
        { name: 'Smart Insulin Delivery', effectiveness: 'High', studies: 22, bias: 'Low' },
        { name: 'Predictive Analytics', effectiveness: 'Med', studies: 14, bias: 'Medium' },
        { name: 'Dietary Management', effectiveness: 'Med', studies: 16, bias: 'Moderate' }
      ]
    }
  ];

  const filteredOutcomes = outcomesData
    .map(outcome => ({
      ...outcome,
      interventions: outcome.interventions.filter(intervention => {
        const matchesSearch = outcome.outcome.toLowerCase().includes(filterText.toLowerCase()) ||
                           intervention.name.toLowerCase().includes(filterText.toLowerCase());
        const matchesEffectiveness = effectivenessFilter === 'all' || intervention.effectiveness === effectivenessFilter;
        const matchesBias = biasFilter === 'all' || intervention.bias === biasFilter;
        return matchesSearch && matchesEffectiveness && matchesBias;
      })
    }))
    .filter(outcome => outcome.interventions.length > 0);

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
    
    return `${colorSet.light} dark:${colorSet.dark}`;
  };

  const effectivenessOptions = ['all', 'High', 'Med', 'Low'];
  const biasOptions = ['all', 'Low', 'Medium', 'Moderate'];

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">{t('outcomes.title')}</h1>
      
      {/* Search and Filters Row */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        {/* Search Input */}
        <div className="flex-grow max-w-md">
          <input
            type="text"
            placeholder={t('outcomes.filterPlaceholder')}
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
            {t('outcomes.effectiveness')}
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
                  {option === 'all' ? t('outcomes.filters.allEffectiveness') : option}
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
            {t('outcomes.bias')}
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
                  {option === 'all' ? t('outcomes.filters.allBias') : option}
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
                {t('outcomes.tableHeaders.outcome')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('outcomes.tableHeaders.intervention')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('outcomes.tableHeaders.effectiveness')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('outcomes.tableHeaders.studies')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('outcomes.tableHeaders.bias')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOutcomes.map((item, index) => (
              item.interventions.map((intervention, interventionIndex) => (
                <tr 
                  key={`${index}-${interventionIndex}`}
                  className="border-b border-input hover:bg-accent/50"
                >
                  {interventionIndex === 0 ? (
                    <td 
                      className="px-6 py-4" 
                      rowSpan={item.interventions.length}
                    >
                      {item.outcome}
                    </td>
                  ) : null}
                  <td className="px-6 py-4">{intervention.name}</td>
                  <td className={`px-6 py-4 ${getEffectivenessColor(intervention.effectiveness)}`}>
                    {intervention.effectiveness}
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="text-primary hover:underline">
                      {intervention.studies}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    {intervention.bias}
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

export default OutcomesPage;