/**
 * CyberJoar Electoral Intelligence Matrix
 * Data: Constituencies (PS5 Standard)
 */

export const constituencies = [
  {
    id: 'c1',
    name: 'New Delhi',
    state: 'Delhi',
    totalVoters: 1423890,
    historicalTurnout: 67.4,
    dominantFactor: 'partyStrength',
    incumbentParty: 'NDA Coalition',
    region: 'North India',
    urbanRuralSplit: '95% Urban',
    keyIssues: ['Air Quality', 'Infrastructure', 'Education'],
    lastResult: { winner: 'Incumbent A', margin: 58124, year: 2024 }
  },
  {
    id: 'c2',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    totalVoters: 1812450,
    historicalTurnout: 58.2,
    dominantFactor: 'casteReligiousBase',
    incumbentParty: 'National Party A',
    region: 'North India',
    urbanRuralSplit: '70% Urban',
    keyIssues: ['Religious Heritage', 'Ganga Cleaning', 'Textiles'],
    lastResult: { winner: 'Incumbent A', margin: 479505, year: 2024 }
  },
  {
    id: 'c3',
    name: 'Mumbai North',
    state: 'Maharashtra',
    totalVoters: 1654300,
    historicalTurnout: 54.8,
    dominantFactor: 'partyStrength',
    incumbentParty: 'NDA Alliance',
    region: 'Western India',
    urbanRuralSplit: '100% Urban',
    keyIssues: ['Housing', 'Local Trains', 'Coastal Road'],
    lastResult: { winner: 'Incumbent B', margin: 124560, year: 2024 }
  },
  {
    id: 'c4',
    name: 'Chennai Central',
    state: 'Tamil Nadu',
    totalVoters: 1321000,
    historicalTurnout: 62.5,
    dominantFactor: 'pastWork',
    incumbentParty: 'Regional Force D',
    region: 'South India',
    urbanRuralSplit: '98% Urban',
    keyIssues: ['Water Scarcity', 'Language Rights', 'Tech Parks'],
    lastResult: { winner: 'Regional Leader C', margin: 89000, year: 2024 }
  },
  {
    id: 'c5',
    name: 'Patna Sahib',
    state: 'Bihar',
    totalVoters: 1945000,
    historicalTurnout: 48.9,
    dominantFactor: 'casteReligiousBase',
    incumbentParty: 'National Party A',
    region: 'East India',
    urbanRuralSplit: '65% Urban',
    keyIssues: ['Employment', 'Floods', 'Agro-processing'],
    lastResult: { winner: 'Candidate A', margin: 264000, year: 2024 }
  },
  {
    id: 'c6',
    name: 'Bengaluru South',
    state: 'Karnataka',
    totalVoters: 1742000,
    historicalTurnout: 53.1,
    dominantFactor: 'digitalSentiment',
    incumbentParty: 'National Party A',
    region: 'South India',
    urbanRuralSplit: '100% Urban',
    keyIssues: ['IT Stability', 'Traffic', 'Waste Management'],
    lastResult: { winner: 'Young Leader B', margin: 331000, year: 2024 }
  },
  {
    id: 'c7',
    name: 'Kolkata North',
    state: 'West Bengal',
    totalVoters: 1450000,
    historicalTurnout: 65.8,
    dominantFactor: 'personalBase',
    incumbentParty: 'AITC Regional',
    region: 'East India',
    urbanRuralSplit: '100% Urban',
    keyIssues: ['Industrialization', 'Heritage Conservation', 'Healthcare'],
    lastResult: { winner: 'AITC Veteran', margin: 42300, year: 2024 }
  },
  {
    id: 'c8',
    name: 'Hyderabad',
    state: 'Telangana',
    totalVoters: 1822000,
    historicalTurnout: 46.7,
    dominantFactor: 'personalBase',
    incumbentParty: 'Regional Force A',
    region: 'South India',
    urbanRuralSplit: '100% Urban',
    keyIssues: ['Old City Dev', 'Tech Investment', 'Minority Welfare'],
    lastResult: { winner: 'Regional Star', margin: 282000, year: 2024 }
  }
];
