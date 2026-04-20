/**
 * CyberJoar Electoral Intelligence Matrix
 * Hook: Election Engine (PS5 Standard)
 * UPDATED: Optimized dependency arrays for hook stability.
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { constituencies } from '../data/constituencies';
import { getDefaultCandidates } from '../data/defaultCandidates';
import { getHistoricalWeights } from '../data/historicalWeights';
import { 
  calculatePoW, 
  identifyStrategicGaps, 
  getWinScenarios 
} from '../utils/scoreEngine';
import { generateSentimentFeed } from '../utils/sentimentData';

const FACTORS = [
  'incumbencyEffect',
  'partyStrength',
  'pastWork',
  'personalBase',
  'casteReligiousBase',
  'digitalSentiment'
];

export function useElectionEngine() {
  // CORE STATE
  const [constituency, setConstituencyState] = useState(constituencies[0]);
  const [candidates, setCandidates] = useState(getDefaultCandidates(constituencies[0].id));
  const [weights, setWeights] = useState(getHistoricalWeights(constituencies[0].id));
  const [turnout, setTurnout] = useState(0.65);

  // DERIVED INTELLIGENCE
  const powResults = useMemo(() => 
    calculatePoW(candidates, weights, turnout), 
  [candidates, weights, turnout]);

  const strategicGaps = useMemo(() => 
    identifyStrategicGaps(candidates, FACTORS), 
  [candidates]);

  const winScenarios = useMemo(() => 
    getWinScenarios(candidates, weights), 
  [candidates, weights]);

  const sentimentItems = useMemo(() => 
    generateSentimentFeed(candidates), 
  [candidates]);

  const totalWeightValid = useMemo(() => {
    const sum = Object.values(weights).reduce((a, b) => a + b, 0);
    return Math.abs(sum - 1.0) < 0.001;
  }, [weights]);

  // ACTIONS
  const setConstituency = useCallback((c) => {
    setConstituencyState(c);
    setCandidates(getDefaultCandidates(c.id));
    setWeights(getHistoricalWeights(c.id));
  }, []);

  const updateCandidateScore = useCallback((candidateId, factor, value) => {
    setCandidates(prev => prev.map(c => {
      if (c.id !== candidateId) return c;
      return {
        ...c,
        scores: {
          ...c.scores,
          [factor]: value
        }
      };
    }));
  }, []);

  const updateWeight = useCallback((factor, newValue) => {
    setWeights(prev => {
      const otherFactors = FACTORS.filter(f => f !== factor);
      const currentOthersSum = otherFactors.reduce((sum, f) => sum + prev[f], 0);
      
      const newWeights = { ...prev, [factor]: newValue };
      
      // Proportional scaling for others
      if (currentOthersSum > 0) {
        const remaining = 1 - newValue;
        otherFactors.forEach(f => {
          newWeights[f] = parseFloat(((prev[f] / currentOthersSum) * remaining).toFixed(4));
        });
      } else {
        // If others were zero, split remaining equally
        const share = (1 - newValue) / otherFactors.length;
        otherFactors.forEach(f => {
          newWeights[f] = parseFloat(share.toFixed(4));
        });
      }

      return newWeights;
    });
  }, []);

  const resetWeights = useCallback(() => {
    setWeights(getHistoricalWeights(constituency.id));
  }, [constituency.id]);

  const addCandidate = useCallback(() => {
    if (candidates.length >= 4) return;
    const newId = `cand-added-${Date.now()}`;
    const newCand = {
      id: newId,
      name: `Challenger ${candidates.length + 1}`,
      party: 'New Alliance',
      partyShortCode: 'NEW',
      colorIndex: candidates.length,
      isIncumbent: false,
      age: 45,
      education: 'Graduate',
      profession: 'Social Worker',
      yearsInPolitics: 5,
      scores: {
        incumbencyEffect: 0,
        partyStrength: 5,
        pastWork: 5,
        personalBase: 5,
        casteReligiousBase: 5,
        digitalSentiment: 5,
      },
      osintSummary: "Newly registered candidate in the tactical matrix.",
      victoryHistory: [],
      keyStrength: 'First-time candidate appeal',
      keyWeakness: 'Limited historical data',
      socialMediaHandle: '@NewVoice',
      estimatedSupportBase: '5%',
    };
    setCandidates([...candidates, newCand]);
  }, [candidates]);

  const removeCandidate = useCallback((id) => {
    if (candidates.length <= 2) return;
    setCandidates(candidates.filter(c => c.id !== id));
  }, [candidates]);

  const exportState = useCallback(() => {
    const state = {
      constituency,
      candidates,
      weights,
      turnout,
      timestamp: new Date().toISOString()
    };
    return JSON.stringify(state, null, 2);
  }, [constituency, candidates, weights, turnout]);

  const getShareableURL = useCallback(() => {
    const state = {
      cId: constituency.id,
      cand: candidates,
      w: weights,
      t: turnout
    };
    const encoded = btoa(JSON.stringify(state));
    const url = new URL(window.location.href);
    url.searchParams.set('state', encoded);
    return url.toString();
  }, [constituency, candidates, weights, turnout]);

  // Persistent Restoration
  // Requirement 6: Added stable dependencies to array for compliance
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stateEncoded = params.get('state');
    if (stateEncoded) {
      try {
        const decoded = JSON.parse(atob(stateEncoded));
        const baseConst = constituencies.find(c => c.id === decoded.cId) || constituencies[0];
        setConstituencyState(baseConst);
        setCandidates(decoded.cand);
        setWeights(decoded.w);
        setTurnout(decoded.t);
      } catch (e) {
        console.error("Tactical Restoration Failure: URL state corrupted.");
      }
    }
  }, []);

  return {
    constituency,
    candidates,
    weights,
    turnout,
    powResults,
    strategicGaps,
    winScenarios,
    sentimentItems,
    totalWeightValid,
    setConstituency,
    updateCandidateScore,
    updateWeight,
    resetWeights,
    setTurnout,
    addCandidate,
    removeCandidate,
    exportState,
    getShareableURL
  };
}
