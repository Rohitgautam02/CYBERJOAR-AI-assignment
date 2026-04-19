/**
 * CyberJoar Electoral Intelligence Matrix
 * Data: Default Candidates Generator (PS5 Standard)
 */

export const getDefaultCandidates = (constituencyId) => {
  const candidatesBase = {
    c1: [ // New Delhi
      {
        id: 'cand-a-c1',
        name: 'Rajesh Kumar Sharma',
        party: 'National Democratic Alliance',
        partyShortCode: 'NDA',
        colorIndex: 0,
        isIncumbent: true,
        age: 56,
        education: 'MA Political Science, JNU',
        profession: 'Career Politician',
        yearsInPolitics: 22,
        scores: {
          incumbencyEffect: 6,
          partyStrength: 8,
          pastWork: 7,
          personalBase: 7,
          casteReligiousBase: 5,
          digitalSentiment: 4,
        },
        osintSummary: "Mixed public sentiment. Strong infrastructure record but facing anti-incumbency wave. Social media coverage 70% neutral, 20% negative on price rise.",
        victoryHistory: [
          { year: 2024, result: 'WON', margin: 58124 },
          { year: 2019, result: 'WON', margin: 43210 },
          { year: 2014, result: 'WON', margin: 28900 },
        ],
        keyStrength: 'Infrastructure development — 3 metro lines commissioned',
        keyWeakness: 'Negative sentiment on fuel prices and unemployment',
        socialMediaHandle: '@RajeshKumarMP',
        estimatedSupportBase: '34%',
      },
      {
        id: 'cand-b-c1',
        name: 'Ananya Deshpande',
        party: 'United Opposition Bloc',
        partyShortCode: 'UOB',
        colorIndex: 1,
        isIncumbent: false,
        age: 39,
        education: 'MBA, Harvard Business School',
        profession: 'Social Entrepreneur',
        yearsInPolitics: 8,
        scores: {
          incumbencyEffect: 0,
          partyStrength: 6,
          pastWork: 5,
          personalBase: 8,
          casteReligiousBase: 4,
          digitalSentiment: 9,
        },
        osintSummary: "Very high youth appeal. Dominating digital discourse. Perceived as fresh alternative with clean image. Strong urban base.",
        victoryHistory: [
          { year: 2024, result: 'LOST', margin: 58124 },
        ],
        keyStrength: 'Digital outreach and youth mobilization',
        keyWeakness: 'Relatively short track record in active legislature',
        socialMediaHandle: '@AnanyaForDelhi',
        estimatedSupportBase: '31%',
      },
      {
        id: 'cand-c-c1',
        name: 'Vikram Singh Negi',
        party: 'Regional People\'s Party',
        partyShortCode: 'RPP',
        colorIndex: 2,
        isIncumbent: false,
        age: 62,
        education: 'LLB, Delhi University',
        profession: 'Lawyer & Union Leader',
        yearsInPolitics: 35,
        scores: {
          incumbencyEffect: 0,
          partyStrength: 4,
          pastWork: 9,
          personalBase: 9,
          casteReligiousBase: 3,
          digitalSentiment: 3,
        },
        osintSummary: "Strong grassroots connection with labor unions. Known for aggressive advocacy for slum dwellers. Limited social media presence.",
        victoryHistory: [
          { year: 2019, result: 'WON', margin: 12000 }, // Regional seat
        ],
        keyStrength: 'Loyal personal base among essential workers',
        keyWeakness: 'Lack of funding compared to national parties',
        socialMediaHandle: '@NegiJiGround',
        estimatedSupportBase: '15%',
      }
    ],
    c2: [ // Varanasi (UP)
      {
        id: 'cand-a-c2',
        name: 'Vishwanath Pratap',
        party: 'National Democratic Alliance',
        partyShortCode: 'NDA',
        colorIndex: 0,
        isIncumbent: true,
        age: 64,
        education: 'Ph.D. in Sanskrit',
        profession: 'Academics / Politics',
        yearsInPolitics: 30,
        scores: {
          incumbencyEffect: 9,
          partyStrength: 9,
          pastWork: 8,
          personalBase: 9,
          casteReligiousBase: 9,
          digitalSentiment: 7,
        },
        osintSummary: "Absolute dominance in the region. Strong religious alignment. Massive development narrative centered on ghats and tourism.",
        victoryHistory: [
          { year: 2024, result: 'WON', margin: 479505 },
          { year: 2019, result: 'WON', margin: 450000 },
        ],
        keyStrength: 'Unmatched religious-heritage consolidation',
        keyWeakness: 'High expectations for future industrial growth',
        socialMediaHandle: '@VPratapVaranasi',
        estimatedSupportBase: '62%',
      },
      {
        id: 'cand-b-c2',
        name: 'Suresh Yadav',
        party: 'Samajik Nyay Party',
        partyShortCode: 'SNP',
        colorIndex: 1,
        isIncumbent: false,
        age: 45,
        education: 'Graduate',
        profession: 'Social Worker',
        yearsInPolitics: 18,
        scores: {
          incumbencyEffect: 0,
          partyStrength: 7,
          pastWork: 6,
          personalBase: 6,
          casteReligiousBase: 8,
          digitalSentiment: 4,
        },
        osintSummary: "Consolidating rural and sub-urban OBC votes. Focus on unemployment among youth and farm issues.",
        victoryHistory: [
          { year: 2024, result: 'LOST', margin: 479505 },
        ],
        keyStrength: 'Strong cadre base in rural segments',
        keyWeakness: 'Struggling to break into urban urban voter base',
        socialMediaHandle: '@SureshYadavVNS',
        estimatedSupportBase: '24%',
      },
      {
        id: 'cand-c-c2',
        name: 'Mirza Baig',
        party: 'Independent Unity',
        partyShortCode: 'IU',
        colorIndex: 3,
        isIncumbent: false,
        age: 51,
        education: 'Post Graduate',
        profession: 'Business Owner',
        yearsInPolitics: 12,
        scores: {
          incumbencyEffect: 0,
          partyStrength: 3,
          pastWork: 4,
          personalBase: 5,
          casteReligiousBase: 7,
          digitalSentiment: 2,
        },
        osintSummary: "Significant influence in the Old City area. Representing minority business interests.",
        victoryHistory: [
          { year: 2024, result: 'LOST', margin: 620000 },
        ],
        keyStrength: 'Niche but locked-in community support',
        keyWeakness: 'Limited statewide or nationwide platform',
        socialMediaHandle: '@MirzaBaigUnity',
        estimatedSupportBase: '8%',
      }
    ]
  };

  // Helper to clone and default-fill for other constituencies to save space but keep it structured
  // In a real app, each would have 3 full unique candidates. 
  // I will fill C3-C8 with representative data but reuse the C1/C2 structure logic to ensure full files.
  
  const regions = { 
    c3: { name: 'Mumbai North', party: 'SHS', color: 0 },
    c4: { name: 'Chennai Central', party: 'DMK', color: 2 },
    c5: { name: 'Patna Sahib', party: 'NDA', color: 0 },
    c6: { name: 'Bengaluru South', party: 'BJP', color: 0 },
    c7: { name: 'Kolkata North', party: 'AITC', color: 2 },
    c8: { name: 'Hyderabad', party: 'AIMIM', color: 3 }
  };

  if (!candidatesBase[constituencyId]) {
    const reg = regions[constituencyId] || { name: 'Regional Seat', party: 'IND', color: 3 };
    return [
      {
        id: `cand-a-${constituencyId}`,
        name: `Candidate A (${reg.name})`,
        party: reg.party,
        partyShortCode: reg.party,
        colorIndex: reg.color,
        isIncumbent: true,
        age: 58,
        education: 'MA / LLB',
        profession: 'Politician',
        yearsInPolitics: 25,
        scores: {
          incumbencyEffect: 7,
          partyStrength: 8,
          pastWork: 6,
          personalBase: 7,
          casteReligiousBase: 6,
          digitalSentiment: 5,
        },
        osintSummary: "Stable regional incumbent. Strong party machinery support.",
        victoryHistory: [{ year: 2024, result: 'WON', margin: 45000 }],
        keyStrength: 'Organization and Party Cadre',
        keyWeakness: 'Anti-incumbency in urban pockets',
        socialMediaHandle: `@Leader${constituencyId}A`,
        estimatedSupportBase: '38%',
      },
      {
        id: `cand-b-${constituencyId}`,
        name: `Candidate B (${reg.name})`,
        party: 'National Challengers',
        partyShortCode: 'NC',
        colorIndex: 1,
        isIncumbent: false,
        age: 42,
        education: 'B.Tech / MBA',
        profession: 'Social Activist',
        yearsInPolitics: 10,
        scores: {
          incumbencyEffect: 0,
          partyStrength: 7,
          pastWork: 4,
          personalBase: 6,
          casteReligiousBase: 7,
          digitalSentiment: 8,
        },
        osintSummary: "Aggressive challenger. Gaining ground via social media.",
        victoryHistory: [{ year: 2024, result: 'LOST', margin: 45000 }],
        keyStrength: 'Youth appeal and digital presence',
        keyWeakness: 'Lack of deep rural network',
        socialMediaHandle: `@Challenger${constituencyId}B`,
        estimatedSupportBase: '32%',
      },
      {
        id: `cand-c-${constituencyId}`,
        name: `Candidate C (${reg.name})`,
        party: 'Independent Bloc',
        partyShortCode: 'IB',
        colorIndex: reg.color === 3 ? 0 : 3,
        isIncumbent: false,
        age: 49,
        education: 'Graduate',
        profession: 'Local Business',
        yearsInPolitics: 15,
        scores: {
          incumbencyEffect: 0,
          partyStrength: 3,
          pastWork: 7,
          personalBase: 8,
          casteReligiousBase: 4,
          digitalSentiment: 4,
        },
        osintSummary: "Local favorite. Capable of playing kingmaker in a close race.",
        victoryHistory: [{ year: 2019, result: 'LOST', margin: 8000 }],
        keyStrength: 'Accessible and hands-on local help record',
        keyWeakness: 'Limited financial resources',
        socialMediaHandle: `@LocalFav${constituencyId}C`,
        estimatedSupportBase: '12%',
      }
    ];
  }

  return candidatesBase[constituencyId];
};
