/**
 * CyberJoar Intelligence Platform
 * SOURCE: OSINT (Open Source Intelligence)
 * CLASSIFICATION: RESTRICTED
 */

const mockOsint = [
  {
    id: "OSINT-2026-001",
    type: "OSINT",
    label: "Anomalous Network Traffic — Sector 7G",
    lat: 28.6139,
    lng: 77.2090,
    timestamp: "2026-04-15T08:23:11Z",
    confidence: 87,
    priority: "HIGH",
    source: "MongoDB Atlas / Social Feed Monitor",
    summary: "Sustained data exfiltration pattern detected across 3 identified endpoints in the Chanakyapuri district. Volume: 4.7GB/hr. Destination: unregistered proxy cluster in Eastern Europe.",
    tags: ["cyber", "network", "exfiltration", "high-priority"],
    metadata: {
      ipAddresses: ["192.168.47.201", "10.0.0.88"],
      protocol: "HTTPS/TLS 1.2",
      dataVolume: "4.7 GB/hr",
      duration: "3h 42m"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "OSINT-2026-002",
    type: "OSINT",
    label: "Significant Financial Transaction Spike",
    lat: 19.0760,
    lng: 72.8777,
    timestamp: "2026-04-16T14:12:45Z",
    confidence: 91,
    priority: "HIGH",
    source: "SWIFT Meta-Analysis / Dark Web Crawler",
    summary: "Unusual volume of localized crypto-to-fiat conversions detected near the Nariman Point financial district. Patterns consistent with laundering operations related to recent ransomware events.",
    tags: ["finance", "crypto", "laundering", "mumbai"],
    metadata: {
      primaryWallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      transactionCount: "1,204",
      totalValue: "₹45.2 Crore",
      status: "Actively Monitoring"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "OSINT-2026-003",
    type: "OSINT",
    label: "Maritime AIS Signal Discrepancy",
    lat: 13.0827,
    lng: 80.2707,
    timestamp: "2026-04-16T22:05:19Z",
    confidence: 76,
    priority: "MEDIUM",
    source: "MarineTraffic API / Satellite Verification",
    summary: "Container vessel 'MV NORTH STAR' reported position 12nm East of Chennai Port; however, passive radar indicates vessel is actually 4nm South. Possible AIS spoofing detected.",
    tags: ["maritime", "spoofing", "chennai", "security"],
    metadata: {
      vesselIMO: "IMO 9214567",
      reportedHeading: "185°",
      actualHeading: "172°",
      vesselType: "Cargo"
    },
    imageUrl: null,
    reviewed: true
  },
  {
    id: "OSINT-2026-004",
    type: "OSINT",
    label: "Unusual Border Movement — North Sector",
    lat: 34.0837,
    lng: 74.7973,
    timestamp: "2026-04-17T03:30:10Z",
    confidence: 94,
    priority: "HIGH",
    source: "Sentinel-2 Satellite Imagery / RF Analysis",
    summary: "Concentration of heavy vehicle signatures detected near Line of Control. Thermal imaging confirms engine heat signatures for 12+ transport trucks stationary since 0200h.",
    tags: ["border", "military", "srinagar", "deployment"],
    metadata: {
      locationAccuracy: "+/- 5m",
      platform: "Sentinel-2B",
      resolution: "10m/pixel",
      thermalIndex: "Alert Level 4"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "OSINT-2026-005",
    type: "OSINT",
    label: "Connectivity Hub Oscillation",
    lat: 12.9716,
    lng: 77.5946,
    timestamp: "2026-04-17T09:45:33Z",
    confidence: 82,
    priority: "MEDIUM",
    source: "Cloudflare Radar / Internal Node Monitor",
    summary: "Intermittent packet loss (up to 15%) detected at the Bangalore Tier-II Internet Exchange. Pattern suggests a sophisticated Layer 7 DDoS targeting cloud-service endpoints.",
    tags: ["cyber", "bangalore", "network", "ddos"],
    metadata: {
      targetSubnet: "104.16.x.x",
      attackVector: "HTTP/2 Rapid Reset",
      peakPPS: "1.2 Million",
      impactLevel: "Localized"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "OSINT-2026-006",
    type: "OSINT",
    label: "E-Payment Infrastructure Vulnerability",
    lat: 17.3850,
    lng: 78.4867,
    timestamp: "2026-04-15T11:20:00Z",
    confidence: 68,
    priority: "MEDIUM",
    source: "ExploitDB / Binary Analysis Lab",
    summary: "New zero-day vulnerability affecting local UPI-integrated payment gateway versions 2.4-2.6. Active scanning for vulnerable endpoints detected originating from multiple IPs.",
    tags: ["cyber", "hyderabad", "fintech", "exploit"],
    metadata: {
      cveReference: "CVE-2026-PENDING",
      cvssScore: "8.4",
      affectedModule: "OAuth2 Provider",
      patchStatus: "Under Development"
    },
    imageUrl: null,
    reviewed: true
  },
  {
    id: "OSINT-2026-007",
    type: "OSINT",
    label: "Supply Chain Logistical Choke",
    lat: 25.5941,
    lng: 85.1376,
    timestamp: "2026-04-16T08:15:22Z",
    confidence: 55,
    priority: "LOW",
    source: "News API / Local Logistics Feed",
    summary: "Significant delays reported at Patna Railway sorting facility due to ongoing labour disputes. Estimated 40,000 tonnes of perishable goods at risk of spoilage.",
    tags: ["logistics", "supply-chain", "patna"],
    metadata: {
      delayEstimate: "48h-72h",
      impactedSector: "Agriculture",
      labourUnion: "BMS Local",
      resolutionStatus: "In Negotiation"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "OSINT-2026-008",
    type: "OSINT",
    label: "Industrial Chemical Leak Warning",
    lat: 23.2599,
    lng: 77.4126,
    timestamp: "2026-04-17T01:10:05Z",
    confidence: 89,
    priority: "HIGH",
    source: "IoT Sensor Grid / Emergency Broadcast",
    summary: "Sensors at the Govindpura Industrial area detected elevated levels of Sulfur Dioxide (SO2). Local emergency protocols activated. Prevailing winds heading South-East.",
    tags: ["industrial", "chemical", "bhopal", "emergency"],
    metadata: {
      sensorID: "BPL-IND-042",
      concentration: "450 ppm",
      safetyThreshold: "20 ppm",
      windSpeed: "12km/h"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "OSINT-2026-009",
    type: "OSINT",
    label: "Encrypted Radio Signal Sync",
    lat: 30.7333,
    lng: 76.7794,
    timestamp: "2026-04-15T22:50:11Z",
    confidence: 72,
    priority: "LOW",
    source: "Signal Intelligence (SIGINT) Metadata",
    summary: "Burst transmission of encrypted VHF signals detected. Triangulated source is the sector-34 communications tower. Content frequency 144.250 MHz.",
    tags: ["comms", "encryption", "chandigarh"],
    metadata: {
      freqRange: "144-148 MHz",
      modType: "PSK31",
      duration: "0.4 seconds",
      repeaterID: "CHD-WEST-01"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "OSINT-2026-010",
    type: "OSINT",
    label: "Social Sentiment Surge — Political",
    lat: 26.8467,
    lng: 80.9462,
    timestamp: "2026-04-16T16:40:00Z",
    confidence: 64,
    priority: "MEDIUM",
    source: "X (Twitter) Firehose / Linguistic Analysis",
    summary: "Large-scale bot-net activity detected promoting specific narratives regarding the upcoming state elections. High volume of coordinated post timestamps from non-local timezones.",
    tags: ["political", "election", "lucknow", "disinfo"],
    metadata: {
      botVolume: "14,500 accounts",
      topHashtag: "#StrategicStability",
      originRegion: "Distributed / VPN",
      targetAudience: "Ages 18-35"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "OSINT-2026-011",
    type: "OSINT",
    label: "Human Trafficking Corridor Alert",
    lat: 26.9124,
    lng: 75.7873,
    timestamp: "2026-04-15T19:12:33Z",
    confidence: 61,
    priority: "MEDIUM",
    source: "Asset Alpha-6 / Dark Web Monitoring",
    summary: "Coded messages intercepted on Telegram channels suggest a new smuggling route active via the Jaipur-Delhi Highway. Specific vehicle descriptions included in metadata.",
    tags: ["trafficking", "crime", "jaipur", "highway"],
    metadata: {
      suspectVehicle: "White Bolero (Partial: RJ-14-XX-xxxx)",
      timing: "Post-midnight",
      hubLocation: "Transport Nagar",
      priorityLevel: "Yellow"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "OSINT-2026-012",
    type: "OSINT",
    label: "Border Logistics Facility Expansion",
    lat: 22.5726,
    lng: 88.3639,
    timestamp: "2026-04-17T06:22:18Z",
    confidence: 79,
    priority: "LOW",
    source: "Planet Labs Imagery / Public Tender Analysis",
    summary: "Satellite imagery shows rapid construction of 4 new warehouse units near the Petrapole border crossing. No public development tenders match this activity level.",
    tags: ["border", "infrastructure", "kolkata", "trade"],
    metadata: {
      sqFootage: "120,000 sq ft",
      constructionPhase: "Foundation/Structural",
      materials: "Pre-fabricated Steel",
      siteSecurity: "Newly Fenced"
    },
    imageUrl: null,
    reviewed: true
  }
];

module.exports = mockOsint;


