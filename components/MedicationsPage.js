import React, { useState } from 'react';
import Footer from './Footer';
import { IconChevronDown, IconFilter } from '@tabler/icons-react';
import { useTranslations } from '../utils/i18n';
import { useDarkMode } from '../utils/DarkModeContext';
import { EFFECTIVENESS_OPTIONS, BIAS_OPTIONS, getEffectivenessColor } from '../lib/research/filter-options';
import { filterMedications } from '../lib/research/medications-filter';
import Link from 'next/link';

const MedicationsPage = ({ medicationsData }) => {
  const [filterText, setFilterText] = useState('');
  const [effectivenessFilter, setEffectivenessFilter] = useState(EFFECTIVENESS_OPTIONS.ALL);
  const [biasFilter, setBiasFilter] = useState(BIAS_OPTIONS.ALL);
  const [showEffectivenessDropdown, setShowEffectivenessDropdown] = useState(false);
  const [showBiasDropdown, setBiasDropdown] = useState(false);
  const { t } = useTranslations();
  const { isDarkMode } = useDarkMode();

  const filteredMedications = filterMedications(
    medicationsData,
    filterText,
    effectivenessFilter,
    biasFilter
  );

  const effectivenessOptions = Object.values(EFFECTIVENESS_OPTIONS);
  const biasOptions = Object.values(BIAS_OPTIONS);

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
            {t('medications.effectiveness')}
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
                  {option === EFFECTIVENESS_OPTIONS.ALL 
                    ? t('medications.filters.allEffectiveness') 
                    : t(`medications.filters.effectiveness.${option.toLowerCase()}`)}
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
            {t('medications.bias')}
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
                  {option === BIAS_OPTIONS.ALL 
                    ? t('medications.filters.allBias')
                    : t(`medications.filters.bias.${option.toLowerCase().replace(/\s+/g, '_')}`)}
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
                    {t(`medications.filters.effectiveness.${outcome.effectiveness.toLowerCase()}`)}
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      href={`/research?type=medication&item=${encodeURIComponent(item.medication)}&outcome=${encodeURIComponent(outcome.name)}`}
                      className="text-primary hover:underline"
                    >
                      {outcome.studies}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    {t(`medications.filters.bias.${outcome.bias.toLowerCase().replace(/\s+/g, '_')}`)}
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