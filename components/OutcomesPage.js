import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IconChevronDown, IconFilter } from '@tabler/icons-react';

const OutcomesPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [effectivenessFilter, setEffectivenessFilter] = useState('all');
  const [biasFilter, setBiasFilter] = useState('all');
  const [showEffectivenessDropdown, setShowEffectivenessDropdown] = useState(false);
  const [showBiasDropdown, setBiasDropdown] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const outcomesData = [
    {
      outcome: 'Outcome 1',
      interventions: [
        { name: 'Intervention 1', effectiveness: 'High', studies: 13, bias: 'Low' },
        { name: 'Intervention 2', effectiveness: 'Low', studies: 5, bias: 'Medium' },
        { name: 'Intervention 3', effectiveness: 'Med', studies: 7, bias: 'Moderate' },
      ]
    },
    {
      outcome: 'Outcome 2',
      interventions: [
        { name: 'Intervention 1', effectiveness: 'High', studies: 13, bias: 'Low' },
        { name: 'Intervention 2', effectiveness: 'Low', studies: 5, bias: 'Medium' }
      ]
    },
    {
      outcome: 'Outcome 3',
      interventions: [
        { name: 'Intervention 4', effectiveness: 'High', studies: 13, bias: 'Low' }
      ]
    },
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
    switch (effectiveness.toLowerCase()) {
      case 'high':
        return 'text-green-600';
      case 'med':
        return 'text-yellow-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const effectivenessOptions = ['all', 'High', 'Med', 'Low'];
  const biasOptions = ['all', 'Low', 'Medium', 'Moderate'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Outcomes Analysis</h1>
        
        {/* Search and Filters Row */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          {/* Search Input */}
          <div className="flex-grow max-w-md">
            <input
              type="text"
              placeholder="Filter outcomes..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <IconFilter className="w-4 h-4" />
              Effectiveness
              <IconChevronDown className="w-4 h-4" />
            </button>
            
            {showEffectivenessDropdown && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {effectivenessOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setEffectivenessFilter(option);
                      setShowEffectivenessDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      effectivenessFilter === option ? 'bg-gray-100' : ''
                    }`}
                  >
                    {option === 'all' ? 'All Effectiveness' : option}
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
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <IconFilter className="w-4 h-4" />
              Bias
              <IconChevronDown className="w-4 h-4" />
            </button>
            
            {showBiasDropdown && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {biasOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setBiasFilter(option);
                      setBiasDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      biasFilter === option ? 'bg-gray-100' : ''
                    }`}
                  >
                    {option === 'all' ? 'All Bias Levels' : option}
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
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Outcome</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Intervention</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Effectiveness</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Studies</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Bias</th>
              </tr>
            </thead>
            <tbody>
              {filteredOutcomes.map((item, index) => (
                item.interventions.map((intervention, interventionIndex) => (
                  <tr 
                    key={`${index}-${interventionIndex}`}
                    className="border-b border-gray-200 hover:bg-gray-50"
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
      </main>

      <Footer />
    </div>
  );
};

export default OutcomesPage;