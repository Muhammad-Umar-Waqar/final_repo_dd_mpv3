/**
 * Filters studies based on the provided parameters.
 * @param {Array} studies - Array of studies containing all relevant information.
 * @param {string} type - Type of study (intervention, medication, supplement).
 * @param {string} item - Name of the intervention/medication/supplement.
 * @param {string} outcome - Name of the outcome.
 * @returns {Array} - Array of filtered studies.
 */
export function filterResearchStudies(studies, type, item, outcome) {
    console.log(studies);
    if (!studies || !Array.isArray(studies)) return [];
    if (!type || !item || !outcome) return [];

    return studies.filter(study => 
        study.type === type &&
        study.intervention === item &&
        study.outcome === outcome
    );
} 