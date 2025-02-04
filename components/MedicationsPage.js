import React, { useState, useMemo, useCallback } from 'react';
import Footer from './Footer';
import { IconChevronDown, IconFilter } from '@tabler/icons-react';
import { useDarkMode } from '../utils/DarkModeContext';
import { useTranslations } from '../utils/i18n';

const MedicationsPage = () => {
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslations();
  const [filterText, setFilterText] = useState('');
  const [effectivenessFilter, setEffectivenessFilter] = useState('all');
  const [biasFilter, setBiasFilter] = useState('all');
  const [showEffectivenessDropdown, setShowEffectivenessDropdown] = useState(false);
  const [showBiasDropdown, setBiasDropdown] = useState(false);

  const medicationsData = [
    {
      medication: 'Insulin Glargine',
      outcomes: [
        { name: 'Glycemic Control', effectiveness: 'High', studies: 45, bias: 'Low' },
        { name: 'Hypoglycemia Risk', effectiveness: 'Med', studies: 38, bias: 'Low' },
        { name: 'Weight Management', effectiveness: 'Med', studies: 32, bias: 'Medium' },
      ]
    },
    {
      medication: 'Metformin',
      outcomes: [
        { name: 'Blood Sugar Control', effectiveness: 'High', studies: 52, bias: 'Low' },
        { name: 'Weight Loss', effectiveness: 'Med', studies: 28, bias: 'Medium' },
        { name: 'Cardiovascular Benefits', effectiveness: 'High', studies: 35, bias: 'Low' }
      ]
    },
    {
      medication: 'GLP-1 Receptor Agonists',
      outcomes: [
        { name: 'Glycemic Control', effectiveness: 'High', studies: 40, bias: 'Low' },
        { name: 'Weight Reduction', effectiveness: 'High', studies: 36, bias: 'Low' },
        { name: 'Cardiovascular Protection', effectiveness: 'High', studies: 30, bias: 'Medium' }
      ]
    },
  ];

  // Memoize filtered medications
  const filteredMedications = useMemo(() => {
    return medicationsData
      .map(medication => ({
        ...medication,
        outcomes: medication.outcomes.filter(outcome => {
          const matchesSearch = medication.medication.toLowerCase().includes(filterText.toLowerCase()) ||
                             outcome.name.toLowerCase().includes(filterText.toLowerCase());
          const matchesEffectiveness = effectivenessFilter === 'all' || outcome.effectiveness === effectivenessFilter;
          const matchesBias = biasFilter === 'all' || outcome.bias === biasFilter;
          return matchesSearch && matchesEffectiveness && matchesBias;
        })
      }))
      .filter(medication => medication.outcomes.length > 0);
  }, [filterText, effectivenessFilter, biasFilter]);

  // Memoize handlers
  const handleEffectivenessFilter = useCallback((option) => {
    setEffectivenessFilter(option);
    setShowEffectivenessDropdown(false);
  }, []);

  const handleBiasFilter = useCallback((option) => {
    setBiasFilter(option);
    setBiasDropdown(false);
  }, []);

  const handleFilterTextChange = useCallback((e) => {
    setFilterText(e.target.value);
  }, []);

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
  }, []); // No longer depends on isDarkMode

  // Filter options
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

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">{t('medications.title')}</h1>
      
      {/* Search and Filters Row */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        {/* Search Input */}
        <div className="flex-grow max-w-md">
          <input
            type="text"
            placeholder={t('medications.filterPlaceholder')}
            className="w-full px-4 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={filterText}
            onChange={handleFilterTextChange}
          />
        </div>

        {/* Effectiveness Filter */}
        <div className="relative">
          <button
            onClick={toggleEffectivenessDropdown}
            className="px-4 py-2 border border-input bg-background rounded-md flex items-center gap-2 hover:bg-accent"
          >
            <IconFilter className="w-4 h-4" />
            {t('medications.effectiveness')}
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
                  {option === 'all' ? t('medications.filters.allEffectiveness') : option}
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
            {t('medications.bias')}
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
                  {option === 'all' ? t('medications.filters.allBias') : option}
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
                {t('medications.tableHeaders.medication')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('medications.tableHeaders.outcome')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('medications.tableHeaders.effectiveness')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('medications.tableHeaders.studies')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                {t('medications.tableHeaders.bias')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMedications.map((item, index) => (
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
                      {item.medication}
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

export default MedicationsPage;