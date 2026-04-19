/**
 * CyberJoar Electoral Intelligence Matrix
 * Utility: Score Engine (PS5 Standard)
 */

/**
 * Calculates a weighted raw score for a candidate based on current factor weights.
 * @param {Object} candidate - The candidate object with scores.
 * @param {Object} weights - The weight distribution object.
 * @returns {number} Raw score from 0-10.
 */
export function calculateRawScore(candidate, weights) {
  return Object.keys(weights).reduce((sum, factor) => {
    return sum + (candidate.scores[factor] * weights[factor]);
  }, 0);
}

/**
 * Applies a turnout-dependent multiplier to account for anti-incumbency or stability.
 * @param {number} rawScore - The pre-turnout score.
 * @param {Object} candidate - The candidate object.
 * @param {number} turnout - Projected turnout percentage (0 to 1.0).
 * @returns {number} Adjusted score.
 */
export function applyTurnoutBias(rawScore, candidate, turnout) {
  if (!candidate.isIncumbent) return rawScore;
  
  // High turnout (>65%) typically amplifies anti-incumbency
  // Low turnout (<50%) typically helps status-quo/incumbents via cadre mobilization
  const bias = turnout > 0.65 
    ? 1 - ((turnout - 0.65) * 0.5)
    : turnout < 0.50
    ? 1 + ((0.50 - turnout) * 0.3)
    : 1;

  return rawScore * Math.max(0.5, Math.min(1.2, bias));
}

/**
 * Main intelligence logic: Calculates Probability of Win (PoW).
 * @param {Array} candidates - Array of candidate objects.
 * @param {Object} weights - Weight distribution object.
 * @param {number} turnout - Projected turnout (0 to 1.0).
 * @returns {Array} Sorted results with PoW percentages.
 */
export function calculatePoW(candidates, weights, turnout) {
  // 1. Calculate raw scores
  const scored = candidates.map(c => ({
    ...c,
    rawScore: calculateRawScore(c, weights),
  }));

  // 2. Apply turnout bias logic
  const biased = scored.map(c => ({
    ...c,
    adjustedScore: applyTurnoutBias(c.rawScore, c, turnout),
  }));

  // 3. Normalize scores to sum = 100% (Probability Distribution)
  const totalAdjusted = biased.reduce((s, c) => s + c.adjustedScore, 0);
  
  return biased
    .map(c => ({
      candidateId: c.id,
      name: c.name,
      party: c.partyShortCode,
      colorIndex: c.colorIndex,
      pow: totalAdjusted > 0 ? parseFloat(((c.adjustedScore / totalAdjusted) * 100).toFixed(1)) : 0,
      rawScore: parseFloat(c.rawScore.toFixed(2)),
      adjustedScore: parseFloat(c.adjustedScore.toFixed(2)),
    }))
    .sort((a, b) => b.pow - a.pow);
}

/**
 * Identifies the leader and trailer for each factor to pinpoint strategic weaknesses.
 * @param {Array} candidates - Current candidate set.
 * @param {Array} factors - List of factor keys.
 * @returns {Array} Gaps sorted by severity.
 */
export function identifyStrategicGaps(candidates, factors) {
  return factors.map(factor => {
    const scores = candidates.map(c => ({ 
      name: c.name, 
      colorIndex: c.colorIndex,
      score: c.scores[factor] 
    }));
    
    const sorted = [...scores].sort((a, b) => b.score - a.score);
    const gapValue = sorted[0].score - sorted[sorted.length - 1].score;
    
    return {
      factor,
      leader: sorted[0],
      trailer: sorted[sorted.length - 1],
      allScores: sorted,
      gap: parseFloat(gapValue.toFixed(1)),
      severity: gapValue > 4 ? 'CRITICAL' : gapValue > 2 ? 'MODERATE' : 'MINOR',
    };
  }).sort((a, b) => b.gap - a.gap);
}

/**
 * Calculates PoW results for three standard turnout scenarios.
 * @param {Array} candidates - Current candidate set.
 * @param {Object} weights - Current weight distribution.
 * @returns {Array} List of scenarios with metadata.
 */
export function getWinScenarios(candidates, weights) {
  const scenarios = [
    { label: 'LOW TURNOUT', turnout: 0.50, description: '~50% voter participation' },
    { label: 'MEDIUM TURNOUT', turnout: 0.65, description: '~65% voter participation' },
    { label: 'HIGH TURNOUT', turnout: 0.78, description: '~78% voter participation' },
  ];

  const results = scenarios.map(s => {
    const powResults = calculatePoW(candidates, weights, s.turnout);
    return {
      ...s,
      winner: powResults[0],
      runnerUp: powResults[1],
      allResults: powResults,
    };
  });

  // Calculate if the winner changes between scenarios (Swing indicator)
  return results.map((s, i, arr) => ({
    ...s,
    isSwing: i > 0 && s.winner.candidateId !== arr[0].winner.candidateId,
  }));
}

/**
 * Returns consistent UI colors based on gap severity.
 */
export function getSeverityColor(severity) {
  if (severity === 'CRITICAL') return '#c0392b'; // Crimson
  if (severity === 'MODERATE') return '#d68910'; // Amber
  return '#6c7a8d'; // Steel
}
