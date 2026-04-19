/**
 * CyberJoar Electoral Intelligence Matrix
 * Utility: Sentiment Data Generator (PS5 Standard)
 */

/**
 * Generates an array of 20 realistic digital intelligence items for the candidates.
 * @param {Array} candidates - The current candidate list.
 * @returns {Array} List of OSINT sentiment items.
 */
export function generateSentimentFeed(candidates) {
  const platforms = ['twitter', 'news', 'forum', 'facebook'];
  const sentiments = ['POSITIVE', 'NEUTRAL', 'NEGATIVE'];
  
  const contentTemplates = {
    POSITIVE: [
      "Significant crowd at the {region} rally. High enthusiasm for {candidate}'s infrastructure vision.",
      "Voter polling in {region} urban pockets shows increasing support for {candidate}.",
      "Finally a candidate talking about actual development. {candidate} has my vote.",
      "{candidate}'s latest policy brief on youth employment is actually comprehensive.",
      "Local welfare schemes by {candidate} are showing clear results on the ground.",
      "Clean image and clear communication. {candidate} is dominating the digital space today."
    ],
    NEUTRAL: [
      "{candidate} scheduled to visit {region} for a massive door-to-door campaign.",
      "New analysis comparing {candidate}'s manifesto with previous years.",
      "Live coverage: {candidate} addressing the local press club on economic stability.",
      "Debate heating up in {region} over the proposed new industrial corridor supported by {candidate}.",
      "Voter turnout expectations for {region} revised after {candidate}'s recent rally.",
      "{candidate} clarifies stance on cross-border trade policies in national interview."
    ],
    NEGATIVE: [
      "Questions raised over {candidate}'s silence on recent fuel price hikes.",
      "Small protest observed during {candidate}'s visit to the old city area.",
      "Social media monitoring identifies a negative trend for {candidate} regarding unemployment numbers.",
      "Opposition targets {candidate} over delayed local bridge project.",
      "Voters in {region} expressing frustration over {candidate}'s lack of presence during recent floods.",
      "High anti-incumbency sentiment detected in {candidate}'s stronghold today."
    ]
  };

  const feed = [];
  const candidateList = candidates.length > 0 ? candidates : [{ id: 'null', name: 'Unknown' }];

  for (let i = 0; i < 20; i++) {
    const candidate = candidateList[i % candidateList.length];
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const templates = contentTemplates[sentiment];
    const content = templates[Math.floor(Math.random() * templates.length)]
      .replace('{candidate}', candidate.name)
      .replace('{region}', 'local');

    feed.push({
      id: i + 1,
      platform,
      candidateId: candidate.id,
      candidateName: candidate.name,
      content,
      sentiment,
      timestamp: `${Math.floor(Math.random() * 5) + 1}h ago`,
      source: platform === 'twitter' ? `@intel_pulse_${i}` : 'Tactical News Network',
      engagements: Math.floor(Math.random() * 2000) + 100,
    });
  }

  // Sort by ID to keep it consistent but pseudo-random
  return feed;
}
