export const EFFECTIVENESS_OPTIONS = {
    ALL: 'all',
    HIGH: 'High',
    MED: 'Med',
    LOW: 'Low'
};

export const BIAS_OPTIONS = {
    ALL: 'all',
    LOW: 'Low',
    SOME_CONCERNS: 'Some Concerns',
    HIGH: 'High',
    VERY_HIGH: 'Very High'
};

export const getEffectivenessColor = (effectiveness) => {
    const colorMap = {
        [EFFECTIVENESS_OPTIONS.HIGH]: {
            light: 'text-green-600',
            dark: 'text-green-400'
        },
        [EFFECTIVENESS_OPTIONS.MED]: {
            light: 'text-yellow-600',
            dark: 'text-yellow-400'
        },
        [EFFECTIVENESS_OPTIONS.LOW]: {
            light: 'text-red-600',
            dark: 'text-red-400'
        },
        default: {
            light: 'text-gray-600',
            dark: 'text-gray-400'
        }
    };

    const colorSet = colorMap[effectiveness] || colorMap.default;
    return `${colorSet.light} dark:${colorSet.dark}`;
}; 