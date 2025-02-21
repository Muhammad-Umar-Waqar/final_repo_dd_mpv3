/**
 * Filters supplements based on search text and filter options
 * @param {Array} supplements - Array of supplements with outcomes
 * @param {string} filterText - Text to search in supplement and outcome names
 * @param {string} effectivenessFilter - Filter for effectiveness level
 * @param {string} biasFilter - Filter for bias level
 * @returns {Array} - Filtered array of supplements
 */
export function filterSupplements(supplements, filterText, effectivenessFilter, biasFilter) {
    return supplements
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
} 