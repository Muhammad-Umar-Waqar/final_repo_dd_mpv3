import { getAllDocuments } from '../lib/mongodb';

export async function getInterventionsTable(lang = 'en-us') {
    // Get all research documents
    const researchDocs = await getAllDocuments('research', lang);

    // Structure to store aggregated results
    const interventionResults = new Map();

    // Process each document
    researchDocs.forEach(doc => {
        if (!doc.data?.body) return;

        // Find intervention slices
        const interventionSlices = doc.data.body.filter(slice =>
            slice.slice_type === 'interventions'
        );

        interventionSlices.forEach(slice => {
            const interventionName = slice.primary?.intervention_text?.[0]?.text || 'Unknown Intervention';

            // Process each outcome
            slice.items.forEach(item => {
                const outcomeName = item.outcome_text?.[0]?.text;
                if (!outcomeName) return;

                const key = `${interventionName}|||${outcomeName}`;

                if (!interventionResults.has(key)) {
                    interventionResults.set(key, {
                        intervention: interventionName,
                        outcome: outcomeName,
                        totalStudies: 0,
                        effectivenessPoints: 0,
                        biasPoints: 0,
                        studySizeSum: 0
                    });
                }

                const result = interventionResults.get(key);

                // Convert study size to points
                let studySizePoints = 1; // Small by default
                const studySize = doc.data?.size_group?.[0]?.study_size || '';
                if (studySize.includes('Medium')) studySizePoints = 2;
                else if (studySize.includes('Large')) studySizePoints = 3;

                // Add effectiveness points
                const effectivenessRank = item.rank_value || 0;
                result.effectivenessPoints += (effectivenessRank * studySizePoints);

                // Add bias points
                const biasLevel = doc.data?.bias_overall || 'Low';
                let biasPoints = 1; // Low
                if (biasLevel === 'Some Concerns') biasPoints = 2;
                else if (biasLevel === 'High') biasPoints = 3;
                else if (biasLevel === 'Very High') biasPoints = 4;

                result.biasPoints += (biasPoints * studySizePoints);
                result.studySizeSum += studySizePoints;
                result.totalStudies++;
            });
        });
    });

    // Calculate and format final results
    const interventionsMap = new Map();

    interventionResults.forEach(result => {
        // Calculate weighted effectiveness average
        const weightedEffectiveness = Math.round(result.effectivenessPoints / result.studySizeSum);
        let effectivenessLabel = 'Low';
        if (weightedEffectiveness === 2) effectivenessLabel = 'Med';
        else if (weightedEffectiveness >= 3) effectivenessLabel = 'High';

        // Calculate weighted bias average
        const weightedBias = Math.round(result.biasPoints / result.studySizeSum);
        let biasLabel = 'Low';
        if (weightedBias === 2) biasLabel = 'Some Concerns';
        else if (weightedBias === 3) biasLabel = 'High';
        else if (weightedBias >= 4) biasLabel = 'Very High';

        // Create or update intervention entry
        if (!interventionsMap.has(result.intervention)) {
            interventionsMap.set(result.intervention, {
                intervention: result.intervention,
                outcomes: []
            });
        }

        // Add outcome to intervention
        const interventionEntry = interventionsMap.get(result.intervention);
        interventionEntry.outcomes.push({
            name: result.outcome,
            effectiveness: effectivenessLabel,
            studies: result.totalStudies,
            bias: biasLabel
        });
    });

    // Convert Map to array
    return Array.from(interventionsMap.values());
}

export async function getOutcomesTable(lang = 'en-us') {
    // Get all research documents
    const researchDocs = await getAllDocuments('research', lang);

    // Structure to store aggregated results
    const outcomeResults = new Map();

    // Process each document
    researchDocs.forEach(doc => {
        if (!doc.data?.body) return;

        // Find intervention slices
        const interventionSlices = doc.data.body.filter(slice =>
            slice.slice_type === 'interventions'
        );

        interventionSlices.forEach(slice => {
            const interventionName = slice.primary?.intervention_text?.[0]?.text || 'Unknown Intervention';

            // Process each outcome
            slice.items.forEach(item => {
                const outcomeName = item.outcome_text?.[0]?.text;
                if (!outcomeName) return;

                const key = `${outcomeName}|||${interventionName}`;

                if (!outcomeResults.has(key)) {
                    outcomeResults.set(key, {
                        outcome: outcomeName,
                        intervention: interventionName,
                        totalStudies: 0,
                        effectivenessPoints: 0,
                        biasPoints: 0,
                        studySizeSum: 0
                    });
                }

                const result = outcomeResults.get(key);

                // Convert study size to points
                let studySizePoints = 1; // Small by default
                const studySize = doc.data?.size_group?.[0]?.study_size || '';
                if (studySize.includes('Medium')) studySizePoints = 2;
                else if (studySize.includes('Large')) studySizePoints = 3;

                // Add effectiveness points
                const effectivenessRank = item.rank_value || 0;
                result.effectivenessPoints += (effectivenessRank * studySizePoints);

                // Add bias points
                const biasLevel = doc.data?.bias_overall || 'Low';
                let biasPoints = 1; // Low
                if (biasLevel === 'Some Concerns') biasPoints = 2;
                else if (biasLevel === 'High') biasPoints = 3;
                else if (biasLevel === 'Very High') biasPoints = 4;

                result.biasPoints += (biasPoints * studySizePoints);
                result.studySizeSum += studySizePoints;
                result.totalStudies++;
            });
        });
    });

    // Calculate and format final results
    const outcomesMap = new Map();

    outcomeResults.forEach(result => {
        // Calculate weighted effectiveness average
        const weightedEffectiveness = Math.round(result.effectivenessPoints / result.studySizeSum);
        let effectivenessLabel = 'Low';
        if (weightedEffectiveness === 2) effectivenessLabel = 'Med';
        else if (weightedEffectiveness >= 3) effectivenessLabel = 'High';

        // Calculate weighted bias average
        const weightedBias = Math.round(result.biasPoints / result.studySizeSum);
        let biasLabel = 'Low';
        if (weightedBias === 2) biasLabel = 'Some Concerns';
        else if (weightedBias === 3) biasLabel = 'High';
        else if (weightedBias >= 4) biasLabel = 'Very High';

        // Create or update outcome entry
        if (!outcomesMap.has(result.outcome)) {
            outcomesMap.set(result.outcome, {
                outcome: result.outcome,
                interventions: []
            });
        }

        // Add intervention to outcome
        const outcomeEntry = outcomesMap.get(result.outcome);
        outcomeEntry.interventions.push({
            name: result.intervention,
            effectiveness: effectivenessLabel,
            studies: result.totalStudies,
            bias: biasLabel
        });
    });

    // Convert Map to array
    return Array.from(outcomesMap.values());
}

export async function getMedicationsTable(lang = 'en-us') {
    // Get all research documents
    const researchDocs = await getAllDocuments('research', lang);

    // Structure to store aggregated results
    const medicationResults = new Map();

    // Process each document
    researchDocs.forEach(doc => {
        if (!doc.data?.body) return;

        // Find intervention slices that are medications
        const medicationSlices = doc.data.body.filter(slice =>
            slice.slice_type === 'interventions' &&
            slice.primary?.intervention_type === 'Medicine'
        );

        medicationSlices.forEach(slice => {
            const medicationName = slice.primary?.intervention_text?.[0]?.text || 'Unknown Medication';

            // Process each outcome
            slice.items.forEach(item => {
                const outcomeName = item.outcome_text?.[0]?.text;
                if (!outcomeName) return;

                const key = `${medicationName}|||${outcomeName}`;

                if (!medicationResults.has(key)) {
                    medicationResults.set(key, {
                        medication: medicationName,
                        outcome: outcomeName,
                        totalStudies: 0,
                        effectivenessPoints: 0,
                        biasPoints: 0,
                        studySizeSum: 0
                    });
                }

                const result = medicationResults.get(key);

                // Convert study size to points
                let studySizePoints = 1; // Small by default
                const studySize = doc.data?.size_group?.[0]?.study_size || '';
                if (studySize.includes('Medium')) studySizePoints = 2;
                else if (studySize.includes('Large')) studySizePoints = 3;

                // Add effectiveness points
                const effectivenessRank = item.rank_value || 0;
                result.effectivenessPoints += (effectivenessRank * studySizePoints);

                // Add bias points
                const biasLevel = doc.data?.bias_overall || 'Low';
                let biasPoints = 1; // Low
                if (biasLevel === 'Some Concerns') biasPoints = 2;
                else if (biasLevel === 'High') biasPoints = 3;
                else if (biasLevel === 'Very High') biasPoints = 4;

                result.biasPoints += (biasPoints * studySizePoints);
                result.studySizeSum += studySizePoints;
                result.totalStudies++;
            });
        });
    });

    // Calculate and format final results
    const medicationsMap = new Map();

    medicationResults.forEach(result => {
        // Calculate weighted effectiveness average
        const weightedEffectiveness = Math.round(result.effectivenessPoints / result.studySizeSum);
        let effectivenessLabel = 'Low';
        if (weightedEffectiveness === 2) effectivenessLabel = 'Med';
        else if (weightedEffectiveness >= 3) effectivenessLabel = 'High';

        // Calculate weighted bias average
        const weightedBias = Math.round(result.biasPoints / result.studySizeSum);
        let biasLabel = 'Low';
        if (weightedBias === 2) biasLabel = 'Some Concerns';
        else if (weightedBias === 3) biasLabel = 'High';
        else if (weightedBias >= 4) biasLabel = 'Very High';

        // Create or update medication entry
        if (!medicationsMap.has(result.medication)) {
            medicationsMap.set(result.medication, {
                medication: result.medication,
                outcomes: []
            });
        }

        // Add outcome to medication
        const medicationEntry = medicationsMap.get(result.medication);
        medicationEntry.outcomes.push({
            name: result.outcome,
            effectiveness: effectivenessLabel,
            studies: result.totalStudies,
            bias: biasLabel
        });
    });

    // Convert Map to array
    return Array.from(medicationsMap.values());
}

export async function getSupplementsTable(lang = 'en-us') {
    // Get all research documents
    const researchDocs = await getAllDocuments('research', lang);

    // Structure to store aggregated results
    const supplementResults = new Map();

    // Process each document
    researchDocs.forEach(doc => {
        if (!doc.data?.body) return;

        // Find intervention slices that are supplements
        const supplementSlices = doc.data.body.filter(slice =>
            slice.slice_type === 'interventions' &&
            slice.primary?.intervention_type === 'Supplement'
        );

        supplementSlices.forEach(slice => {
            const supplementName = slice.primary?.intervention_text?.[0]?.text || 'Unknown Supplement';

            // Process each outcome
            slice.items.forEach(item => {
                const outcomeName = item.outcome_text?.[0]?.text;
                if (!outcomeName) return;

                const key = `${supplementName}|||${outcomeName}`;

                if (!supplementResults.has(key)) {
                    supplementResults.set(key, {
                        supplement: supplementName,
                        outcome: outcomeName,
                        totalStudies: 0,
                        effectivenessPoints: 0,
                        biasPoints: 0,
                        studySizeSum: 0
                    });
                }

                const result = supplementResults.get(key);

                // Convert study size to points
                let studySizePoints = 1; // Small by default
                const studySize = doc.data?.size_group?.[0]?.study_size || '';
                if (studySize.includes('Medium')) studySizePoints = 2;
                else if (studySize.includes('Large')) studySizePoints = 3;

                // Add effectiveness points
                const effectivenessRank = item.rank_value || 0;
                result.effectivenessPoints += (effectivenessRank * studySizePoints);

                // Add bias points
                const biasLevel = doc.data?.bias_overall || 'Low';
                let biasPoints = 1; // Low
                if (biasLevel === 'Some Concerns') biasPoints = 2;
                else if (biasLevel === 'High') biasPoints = 3;
                else if (biasLevel === 'Very High') biasPoints = 4;

                result.biasPoints += (biasPoints * studySizePoints);
                result.studySizeSum += studySizePoints;
                result.totalStudies++;
            });
        });
    });

    // Calculate and format final results
    const supplementsMap = new Map();

    supplementResults.forEach(result => {
        // Calculate weighted effectiveness average
        const weightedEffectiveness = Math.round(result.effectivenessPoints / result.studySizeSum);
        let effectivenessLabel = 'Low';
        if (weightedEffectiveness === 2) effectivenessLabel = 'Med';
        else if (weightedEffectiveness >= 3) effectivenessLabel = 'High';

        // Calculate weighted bias average
        const weightedBias = Math.round(result.biasPoints / result.studySizeSum);
        let biasLabel = 'Low';
        if (weightedBias === 2) biasLabel = 'Some Concerns';
        else if (weightedBias === 3) biasLabel = 'High';
        else if (weightedBias >= 4) biasLabel = 'Very High';

        // Create or update supplement entry
        if (!supplementsMap.has(result.supplement)) {
            supplementsMap.set(result.supplement, {
                supplement: result.supplement,
                outcomes: []
            });
        }

        // Add outcome to supplement
        const supplementEntry = supplementsMap.get(result.supplement);
        supplementEntry.outcomes.push({
            name: result.outcome,
            effectiveness: effectivenessLabel,
            studies: result.totalStudies,
            bias: biasLabel
        });
    });

    // Convert Map to array
    return Array.from(supplementsMap.values());
}

export async function getAllResearchStudies(lang = 'en-us') {
    const researchDocs = await getAllDocuments('research', lang);
    console.log(researchDocs.length);
    const studies = [];

    researchDocs.forEach(doc => {
        if (!doc.data?.body) return;

        const baseStudyInfo = {
            uid: doc.uid,
            title: doc.data?.title?.[0]?.text || 'Unknown Title',
            size: doc.data?.size_group?.[0]?.study_size || 'Unknown Size',
            bias: doc.data?.bias_overall || 'Unknown Bias'
        };

        // Process interventions
        const interventionSlices = doc.data.body.filter(slice =>
            slice.slice_type === 'interventions'
        );

        interventionSlices.forEach(slice => {
            const interventionName = slice.primary?.intervention_text?.[0]?.text;
            const interventionType = slice.primary?.intervention_type;
            
            // Determine the type based on various conditions
            let type = 'intervention';
            if (interventionType === 'Medicine') {
                type = 'medication';
            } else if (
                interventionType === 'Supplement' ||
                doc.data?.domain_group?.some(d => 
                    d.domain_text?.[0]?.text === 'Supplements' ||
                    d.domain_text?.[0]?.text === 'Dietary Supplements'
                ) ||
                interventionName?.toLowerCase().includes('supplement') ||
                interventionName?.toLowerCase().includes('vitamin') ||
                interventionName?.toLowerCase().includes('mineral')
            ) {
                type = 'supplement';
            }

            slice.items.forEach(item => {
                const outcomeName = item.outcome_text?.[0]?.text;
                if (!outcomeName || !interventionName) return;

                studies.push({
                    ...baseStudyInfo,
                    type,
                    intervention: interventionName,
                    outcome: outcomeName,
                    effectiveness: item.rank_value || 0
                });
            });
        });
    });

    return studies;
}