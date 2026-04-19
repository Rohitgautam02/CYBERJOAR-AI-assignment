/**
 * CyberJoar Electoral Intelligence Matrix
 * Data: Historical Weights per Constituency (PS5 Standard)
 */

/**
 * Weights determine how much each variable influences the final PoW calculation.
 * Each constituency has unique political dynamics captured here.
 * ALL weight objects must sum to exactly 1.0.
 */
export const getHistoricalWeights = (constituencyId) => {
  const weightsMap = {
    c1: { // New Delhi - Balanced Urban Seat
      incumbencyEffect: 0.15,
      partyStrength: 0.30,
      pastWork: 0.15,
      personalBase: 0.15,
      casteReligiousBase: 0.10,
      digitalSentiment: 0.15,
    },
    c2: { // Varanasi - High Religion/Caste Factor
      incumbencyEffect: 0.10,
      partyStrength: 0.25,
      pastWork: 0.15,
      personalBase: 0.15,
      casteReligiousBase: 0.30,
      digitalSentiment: 0.05,
    },
    c3: { // Mumbai North - Party Strength + Urban Sentiment
      incumbencyEffect: 0.10,
      partyStrength: 0.35,
      pastWork: 0.20,
      personalBase: 0.10,
      casteReligiousBase: 0.05,
      digitalSentiment: 0.20,
    },
    c4: { // Chennai Central - Heavy focus on Past Work
      incumbencyEffect: 0.20,
      partyStrength: 0.20,
      pastWork: 0.30,
      personalBase: 0.15,
      casteReligiousBase: 0.05,
      digitalSentiment: 0.10,
    },
    c5: { // Patna Sahib - Very High Caste Base
      incumbencyEffect: 0.05,
      partyStrength: 0.25,
      pastWork: 0.10,
      personalBase: 0.20,
      casteReligiousBase: 0.35,
      digitalSentiment: 0.05,
    },
    c6: { // Bengaluru South - Digital/Modern Focus
      incumbencyEffect: 0.10,
      partyStrength: 0.25,
      pastWork: 0.15,
      personalBase: 0.10,
      casteReligiousBase: 0.15,
      digitalSentiment: 0.25,
    },
    c7: { // Kolkata North - Personal/Legacy Base Dominant
      incumbencyEffect: 0.15,
      partyStrength: 0.20,
      pastWork: 0.15,
      personalBase: 0.30,
      casteReligiousBase: 0.10,
      digitalSentiment: 0.10,
    },
    c8: { // Hyderabad - Personal Base + Religious Alignment
      incumbencyEffect: 0.10,
      partyStrength: 0.15,
      pastWork: 0.15,
      personalBase: 0.30,
      casteReligiousBase: 0.25,
      digitalSentiment: 0.05,
    }
  };

  return weightsMap[constituencyId] || weightsMap.c1;
};

export const FACTOR_DESCRIPTIONS = {
  incumbencyEffect: "Impact of holding office — can be positive (development record) or negative (anti-incumbency wave)",
  partyStrength: "National/state party machinery, alliance strength, and cadre mobilization capacity",
  pastWork: "Verified development record, fund utilization, legislative activity, local projects",
  personalBase: "Candidate-specific following beyond party — local influence, family legacy, personal charisma",
  casteReligiousBase: "Demographic alignment with dominant caste/community blocks in the constituency",
  digitalSentiment: "OSINT-derived score from social media sentiment analysis, news coverage, and public forums",
};
