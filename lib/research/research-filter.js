/**
 * Filtra los estudios basados en los parámetros proporcionados
 * @param {Array} studies - Array de estudios con toda la información
 * @param {string} type - Tipo de estudio (intervention, medication, supplement)
 * @param {string} item - Nombre de la intervención/medicamento/suplemento
 * @param {string} outcome - Nombre del resultado
 * @returns {Array} - Array de estudios filtrados
 */
export function filterResearchStudies(studies, type, item, outcome) {
    if (!studies || !Array.isArray(studies)) return [];
    if (!type || !item || !outcome) return [];

    return studies.filter(study => 
        study.type === type &&
        study.intervention === item &&
        study.outcome === outcome
    );
} 