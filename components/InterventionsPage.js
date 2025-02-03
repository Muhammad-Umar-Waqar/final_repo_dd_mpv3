import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IconChevronDown, IconFilter } from '@tabler/icons-react';

const InterventionsPage = () => {
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

  // Same data structure and filtering logic as Medications page, just with interventions
  const interventionsData = [
    {
      intervention: 'Intervention 1',
      outcomes: [
        { name: 'Outcome 1', effectiveness: 'High', studies: 13, bias: 'Low' },
        { name: 'Outcome 2', effectiveness: 'Low', studies: 5, bias: 'Medium' },
        { name: 'Outcome 3', effectiveness: 'Med', studies: 7, bias: 'Moderate' },
      ]
    },
    {
      intervention: 'Intervention 2',
      outcomes: [
        { name: 'Outcome 1', effectiveness: 'High', studies: 13, bias: 'Low' },
        { name: 'Outcome 2', effectiveness: 'Low', studies: 5, bias: 'Medium' }
      ]
    },
    {
      intervention: 'Intervention 3',
      outcomes: [
        { name: 'Outcome 4', effectiveness: 'High', studies: 13, bias: 'Low' }
      ]
    },
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
        <h1 className="text-3xl font-bold mb-8">Interventions Analysis</h1>
        
        {/* Search and Filters Row */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          {/* Search Input */}
          <div className="flex-grow max-w-md">
            <input
              type="text"
              placeholder="Filter interventions..."
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Intervention</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Outcome</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Effectiveness</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Studies</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Bias</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterventions.map((item, index) => (
                item.outcomes.map((outcome, outcomeIndex) => (
                  <tr 
                    key={`${index}-${outcomeIndex}`}
                    className="border-b border-gray-200 hover:bg-gray-50"
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
      </main>

      <Footer />
    </div>
  );
};

export default InterventionsPage;