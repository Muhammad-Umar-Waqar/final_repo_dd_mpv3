/**
 * Filters medications based on search text and filter options
 * @param {Array} medications - Array of medications with outcomes
 * @param {string} filterText - Text to search in medication and outcome names
 * @param {string} effectivenessFilter - Filter for effectiveness level
 * @param {string} biasFilter - Filter for bias level
 * @returns {Array} - Filtered array of medications
 */
export function filterMedications(medications, filterText, effectivenessFilter, biasFilter) {
    return medications
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
} 