# CyberJoar Intelligence Suite
**Integrated Strategic Assets Monorepo**

## 🌐 Mission Overview
The CyberJoar Intelligence Suite is a unified ecosystem of tactical intelligence platforms designed for high-fidelity data fusion, visual analytics, and predictive electoral modeling. This monorepo synchronizes two distinct operational units as a cohesive suite.

---

## 🏗 System Architecture (Monorepo)

The project is structured using **NPM Workspaces** for seamless orchestration across multiple technical layers.

```bash
cyberjoar-intel-suite/
├── ps1-fusion-dashboard/   # [Strategic Fusion Unit]
│   ├── frontend/           # React 18 + Vite + Tailwind + Leaflet
│   └── backend/            # Node.js + Express (Intelligence API)
└── ps5-electoral-matrix/   # [Electoral Matrix Unit]
    └── [React Stack]       # React 18 + Vite + Recharts (Analytical Engine)
```

---

## 🛠 Strategic Assets

### 1. PS1 — Strategic Fusion Dashboard
A multi-source intelligence dashboard (OSINT/HUMINT/IMINT) featuring:
- **Geospatial Tactical View**: Interactive high-contrast map with intelligence markers.
- **Node Management**: Secure tracking and verification of intelligence assets.
- **Asset Ingestion**: Unified CSV/JSON and tactical imagery upload system.
- **Status**: Operational | Database: Mock Intelligence Hub.

### 2. PS5 — Electoral Intelligence Matrix
A multi-dimensional predictive analytics platform featuring:
- **Probability of Win (PoW) Engine**: Real-time modeling with turnout-dependent bias.
- **Constituency Profiling**: In-depth analysis of swing factors and historical weights.
- **Sentiment Feed**: Live tracking of digital intelligence and public perception.
- **Status**: Tactical Beta | Platform: Mobile & Desktop Optimized.

---

## 🚀 Operational Command (Local)

Run individual units directly via root scripts:

### PS1 — Fusion Hub
```bash
# Launch Intelligence Frontend
npm run dev:ps1-front

# Launch Intelligence Backend API
npm run dev:ps1-back
```

### PS5 — Analytics Matrix
```bash
# Launch Electoral Engine
npm run dev:ps5
```

### Build For Production
```bash
# Compile all strategic assets
npm run build:ps1
npm run build:ps5
```

---

## 📦 Deployment Protocol
The suite is production-ready for multi-platform deployment:
- **Frontend Assets (PS1 & PS5)**: Optimized for **Vercel**.
- **Backend Hub (PS1)**: Optimized for **Render** or Railway.

> [!TIP]
> See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions on environment variables and platform configuration.

---

## 🛡 Strategic Integrity
- **Design System**: Standardized "Military-Grade" UI tokens (Navy/Gold/Emerald/Crimson).
- **Communication Protocol**: Managed via the CyberJoar Unified Intelligence Hook system.
- **Status**: ALL SYSTEMS NOMINAL

---
**CyberJoar Strategic Group**
Intelligence Reference: OC.41335.2026.59218
