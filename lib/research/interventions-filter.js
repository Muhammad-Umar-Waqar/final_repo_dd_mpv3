/**
 * Filters interventions based on search text and filter options
 * @param {Array} interventions - Array of interventions with outcomes
 * @param {string} filterText - Text to search in intervention and outcome names
 * @param {string} effectivenessFilter - Filter for effectiveness level
 * @param {string} biasFilter - Filter for bias level
 * @returns {Array} - Filtered array of interventions
 */
export function filterInterventions(interventions, filterText, effectivenessFilter, biasFilter) {
    return interventions
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
} 