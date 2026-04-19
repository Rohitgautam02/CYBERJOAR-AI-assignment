/**
 * CyberJoar Electoral Intelligence Matrix
 * Utility: Formatters (PS5 Standard)
 */

/**
 * Formats numbers into Indian numbering system with commas.
 * @param {number} value 
 */
export const formatVoterCount = (value) => {
  if (value === undefined || value === null) return '0';
  return new Intl.NumberFormat('en-IN').format(value);
};

/**
 * Formats a probability percentage.
 * @param {number} value 
 */
export const formatProbability = (value) => {
  if (value === undefined || value === null) return '0%';
  return `${value.toFixed(1)}%`;
};

/**
 * Capitalizes factor keys for display.
 * @param {string} key 
 */
export const formatFactorLabel = (key) => {
  if (!key) return '';
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

/**
 * Formats turnout percentage.
 * @param {number} decimal - 0 to 1 range
 */
export const formatTurnoutLabel = (decimal) => {
  return `${Math.round(decimal * 100)}%`;
};

/**
 * Returns a short abbreviation for factors.
 * @param {string} factor 
 */
export const getFactorAbbr = (factor) => {
  const map = {
    incumbencyEffect: 'INC',
    partyStrength: 'PTY',
    pastWork: 'WRK',
    personalBase: 'BAS',
    casteReligiousBase: 'DEM',
    digitalSentiment: 'DIG'
  };
  return map[factor] || 'FAC';
};
