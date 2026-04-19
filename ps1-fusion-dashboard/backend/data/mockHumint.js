/**
 * CyberJoar Intelligence Platform
 * SOURCE: HUMINT (Human Intelligence)
 * CLASSIFICATION: RESTRICTED
 */

const mockHumint = [
  {
    id: "HUMINT-2026-001",
    type: "HUMINT",
    label: "Field Asset Report: BRAVO-7 Sync",
    lat: 18.9220,
    lng: 72.8347,
    timestamp: "2026-04-15T19:45:00Z",
    confidence: 85,
    priority: "HIGH",
    source: "Human Field Asset",
    summary: "Asset BRAVO-7 confirmed a high-level meeting between local crime syndicate leads and a foreign procurement officer. Discussion centered on bypass routes for restricted dual-use components.",
    tags: ["humint", "mumbai", "procurement", "bravo-7"],
    metadata: {
      assetCode: "BRAVO-7",
      meetingLocation: "Gateway Hotel - Private Lounge",
      reliability: "B2",
      subjectDescription: "Male, mid-40s, North-European accent"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "HUMINT-2026-002",
    type: "HUMINT",
    label: "CIS Operative Report: Border Infiltration",
    lat: 34.1983,
    lng: 74.8077,
    timestamp: "2026-04-16T02:15:22Z",
    confidence: 90,
    priority: "HIGH",
    source: "CIS Operative Report",
    summary: "Informant reports 4 individuals crossing the terrain at a non-monitored drainage point near the Gurez sector. Equipment observed includes tactical backpacks and satellite phones.",
    tags: ["humint", "border", "infiltration", "srinagar"],
    metadata: {
      assetCode: "CIS-LOCAL-09",
      meetingLocation: "Safehouse Delta",
      reliability: "A1",
      threatLevel: "Critical"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "HUMINT-2026-003",
    type: "HUMINT",
    label: "Embassy Contact: Diplomatic Intel",
    lat: 28.5918,
    lng: 77.1865,
    timestamp: "2026-04-17T11:30:10Z",
    confidence: 72,
    priority: "MEDIUM",
    source: "Embassy Contact",
    summary: "A junior diplomat at the [REDACTED] embassy leaked information regarding an upcoming unauthorized trade delegation specifically targeting the aerospace sector.",
    tags: ["diplomatic", "trade", "delhi"],
    metadata: {
      assetCode: "SILVER-VOICE",
      reliability: "C3",
      sourcePosition: "Administrative",
      leakMedium: "Encrypted Messaging"
    },
    imageUrl: null,
    reviewed: true
  },
  {
    id: "HUMINT-2026-004",
    type: "HUMINT",
    label: "Informant: Coastal Smuggling Hub",
    lat: 15.4909,
    lng: 73.8278,
    timestamp: "2026-04-16T23:55:00Z",
    confidence: 65,
    priority: "MEDIUM",
    source: "Human Field Asset",
    summary: "Local informant in Panaji reports a sudden increase in night-time dhow activity at the private jetty usually reserved for luxury yacht maintenance.",
    tags: ["smuggling", "coastal", "goa"],
    metadata: {
      assetCode: "FISHERMAN-X",
      meetingLocation: "Dock 4",
      reliability: "D2",
      cargoDescription: "Small wooden crates, heavy lift"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "HUMINT-2026-005",
    type: "HUMINT",
    label: "CIS Operative: Internal Node Breach",
    lat: 13.0475,
    lng: 80.2089,
    timestamp: "2026-04-15T08:10:00Z",
    confidence: 88,
    priority: "HIGH",
    source: "CIS Operative Report",
    summary: "Visual confirmation of unauthorized physical access to a telecom switching station. The individual used a maintenance keycard reported stolen 48 hours ago.",
    tags: ["cyber-physical", "telecom", "chennai"],
    metadata: {
      assetCode: "TECH-SHADOW",
      meetingLocation: "Station Gamma",
      reliability: "A2",
      suspectID: "INTERNAL-FLAG-77"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "HUMINT-2026-006",
    type: "HUMINT",
    label: "Field Asset: Political Unrest Catalyst",
    lat: 22.5645,
    lng: 88.3433,
    timestamp: "2026-04-17T15:20:44Z",
    confidence: 58,
    priority: "LOW",
    source: "Human Field Asset",
    summary: "Asset reports a surge in recruitment for 'peaceful protests' with cash payments being offered to participants. Origin of funding traced back to an offshore shell entity.",
    tags: ["unrest", "funding", "kolkata"],
    metadata: {
      assetCode: "STREET-EYE",
      reliability: "C4",
      paymentMethod: "Cash in Envelopes",
      groupTargeted: "Unemployed Youth"
    },
    imageUrl: null,
    reviewed: false
  },
  {
    id: "HUMINT-2026-007",
    type: "HUMINT",
    label: "Asset Report: Biotech IP Leak",
    lat: 18.5204,
    lng: 73.8567,
    timestamp: "2026-04-16T12:00:00Z",
    confidence: 82,
    priority: "MEDIUM",
    source: "CIS Operative Report",
    summary: "Operational lead at a major biotech firm in Pune found to be in possession of encrypted drives containing proprietary vaccine sequences not authorized for removal.",
    tags: ["biotech", "ip-theft", "pune"],
    metadata: {
      assetCode: "LAB-RAT",
      reliability: "B1",
      dataVolume: "512 GB",
      deviceType: "Ruggedized SSD"
    },
    imageUrl: null,
    reviewed: true
  },
  {
    id: "HUMINT-2026-008",
    type: "HUMINT",
    label: "Informant: Rail Logistic Anomaly",
    lat: 21.1458,
    lng: 79.0882,
    timestamp: "2026-04-15T04:30:11Z",
    confidence: 77,
    priority: "LOW",
    source: "Human Field Asset",
    summary: "Night-shift worker at Nagpur junction reports 3 unlisted tankers being attached to a grain shipment headed East. Tankers had no hazmat markings.",
    tags: ["logistics", "anomaly", "nagpur"],
    metadata: {
      assetCode: "RAIL-GHOST",
      reliability: "B3",
      wagonNumbers: ["NAG-X-99", "NAG-X-101"],
      destinationTag: "Kolkata Port"
    },
    imageUrl: null,
    reviewed: false
  }
];

module.exports = mockHumint;


