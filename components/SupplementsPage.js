import React, { useState, useMemo, useCallback } from 'react';
import Footer from './Footer';
import { IconChevronDown, IconFilter } from '@tabler/icons-react';
import { useDarkMode } from '../utils/DarkModeContext';
import { useTranslations } from '../utils/i18n';

const SupplementsPage = () => {
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslations();
  const [filterText, setFilterText] = useState('');
  const [effectivenessFilter, setEffectivenessFilter] = useState('all');
  const [biasFilter, setBiasFilter] = useState('all');
  const [showEffectivenessDropdown, setShowEffectivenessDropdown] = useState(false);
  const [showBiasDropdown, setBiasDropdown] = useState(false);

  const supplementsData = [
    {
      supplement: 'Vitamin D',
      outcomes: [
        { name: 'Blood Sugar Control', effectiveness: 'Med', studies: 28, bias: 'Low' },
        { name: 'Insulin Sensitivity', effectiveness: 'Med', studies: 22, bias: 'Medium' },
        { name: 'Bone Health', effectiveness: 'High', studies: 35, bias: 'Low' },
      ]
    },
    {
      supplement: 'Magnesium',
      outcomes: [
        { name: 'Glucose Metabolism', effectiveness: 'High', studies: 30, bias: 'Low' },
        { name: 'Insulin Resistance', effectiveness: 'Med', studies: 25, bias: 'Medium' },
        { name: 'Nerve Function', effectiveness: 'High', studies: 20, bias: 'Low' }
      ]
    },
    {
      supplement: 'Alpha Lipoic Acid',
      outcomes: [
        { name: 'Neuropathy Symptoms', effectiveness: 'High', studies: 24, bias: 'Low' },
        { name: 'Oxidative Stress', effectiveness: 'High', studies: 18, bias: 'Low' },
        { name: 'Insulin Sensitivity', effectiveness: 'Med', studies: 15, bias: 'Medium' }
      ]
    }
  ];

  const filteredSupplements = useMemo(() => {
    return supplementsData
      .map(supplement => ({
        ...supplement,
        outcomes: supplement.outcomes.filter(outcome => {
          const matchesSearch = supplement.supplement.toLowerCase().includes(filterText.toLowerCase()) ||
                             outcome.name.toLowerCase().includes(filterText.toLowerCase());
          const matchesEffectiveness = effectivenessFilter === 'all' || outcome.effectiveness === effectivenessFilter;
          const matchesBias = biasFilter === 'all' || outcome.bias === biasFilter;
          return matchesSearch && matchesEffectiveness && matchesBias;
        })
      }))
      .filter(supplement => supplement.outcomes.length > 0);
  }, [filterText, effectivenessFilter, biasFilter]);

  const getEffectivenessColor = useCallback((effectiveness) => {
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
  }, []); // No dependencies needed since it's now static

  const effectivenessOptions = ['all', 'High', 'Med', 'Low'];
  const biasOptions = ['all', 'Low', 'Medium', 'Moderate'];

  const toggleEffectivenessDropdown = useCallback(() => {
    setShowEffectivenessDropdown(!showEffectivenessDropdown);
    setBiasDropdown(false);
  }, [showEffectivenessDropdown]);

  const toggleBiasDropdown = useCallback(() => {
    setBiasDropdown(!showBiasDropdown);
    setShowEffectivenessDropdown(false);
  }, [showBiasDropdown]);

  const handleEffectivenessFilter = useCallback((option) => {
    setEffectivenessFilter(option);
    setShowEffectivenessDropdown(false);
  }, []);

  const handleBiasFilter = useCallback((option) => {
    setBiasFilter(option);
    setBiasDropdown(false);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">{t('supplements.title')}</h1>
      
      {/* Search and Filters Row */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        {/* Search Input */}
        <div className="flex-grow max-w-md">
          <input
            type="text"
            placeholder={t('supplements.filterPlaceholder')}
            className="w-full px-4 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        {/* Effectiveness Filter */}
        <div className="relative">
          <button
            onClick={toggleEffectivenessDropdown}
            className="px-4 py-2 border border-input bg-background rounded-md flex items-center gap-2 hover:bg-accent"
          >
            <IconFilter className="w-4 h-4" />
            {t('supplements.effectiveness')}
            <IconChevronDown className="w-4 h-4" />
          </button>
          
          {showEffectivenessDropdown && (
            <div className="absolute top-full mt-1 w-48 bg-background border border-input rounded-md shadow-lg z-10">
              {effectivenessOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleEffectivenessFilter(option)}
                  className={`w-full text-left px-4 py-2 hover:bg-accent ${
                    effectivenessFilter === option ? 'bg-accent/50' : ''
                  }`}
                >
                  {option === 'all' ? t('supplements.filters.allEffectiveness') : option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bias Filter */}
        <div className="relative">
          <button
            onClick={toggleBiasDropdown}
            className="px-4 py-2 border border-input bg-background rounded-md flex items-center gap-2 hover:bg-accent"
          >
            <IconFilter className="w-4 h-4" />
            {t('supplements.bias')}
            <IconChevronDown className="w-4 h-4" />
          </button>
          
          {showBiasDropdown && (
            <div className="absolute top-full mt-1 w-48 bg-background border border-input rounded-md shadow-lg z-10">
              {biasOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleBiasFilter(option)}
                  className={`w-full text-left px-4 py-2 hover:bg-accent ${
                    biasFilter === option ? 'bg-accent/50' : ''
                  }`}
                >
                  {option === 'all' ? t('supplements.filters.allBias') : option}
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
                {t('supplements.tableHeaders.supplement')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('supplements.tableHeaders.outcome')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('supplements.tableHeaders.effectiveness')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('supplements.tableHeaders.studies')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('supplements.tableHeaders.bias')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSupplements.map((item, index) => (
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
                      {item.supplement}
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

export default SupplementsPage;