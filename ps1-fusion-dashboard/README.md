# CyberJoar Strategic Fusion Dashboard
## PS1 — Multi-Source Intelligence Fusion Dashboard
### Intelligence OC Reference: OC.41335.2026.59218

Controlled environment dashboard for multi-source intelligence fusion, visualization, and strategic analysis. Built for high-stakes operational environments with a focus on tactical awareness and military-grade UI/UX.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- npm (v9+)

### 2. Backend Initialization (Hub)
```bash
cd backend
npm install
npm run dev
```
*Hub will be active at http://localhost:4000*

### 3. Frontend Initialization (Operational View)
```bash
# In a new terminal
cd frontend
npm install
npm run dev
```
*Operational view active at http://localhost:3000*

---

## 🛠 Tech Stack
- **Dashboard Core**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom Military Design Tokens)
- **Geospatial**: React-Leaflet + Esri World Dark Gray
- **Intelligence Hub**: Node.js + Express
- **Ingestion Tools**: Multer (Imagery) + PapaParse (CSV) + Axios
- **Tactical Icons**: Lucide React

---

## 🏗 Features Implemented

- **OSINT Hub Sync**: Real-time synchronization with mock external databases (MongoDB/S3 simulations).
- **Field Asset Ingestion (HUMINT)**: Seamless drag-and-drop ingestion of encrypted CSV and JSON field reports.
- **Imagery Registration (IMINT)**: Tactical imagery upload with coordinate locking and high-fidelity preview.
- **Geospatial Awareness**: Interactive dark-gray terrain map with automated node clustering, pulses for high-priority entries, and tactical tooltips.
- **Intelligence Dossiers**: Deep-dive modals for individual nodes featuring mini-map confirmation, metadata tables, and verification workflows.
- **Confidence Visualization**: Real-time scoring display using animated confidence metrics.
- **Strategic Filtering**: Global source-type filtering with live count synchronization.
- **Export Capabilities**: tactical extraction of intelligence data in JSON and CSV formats.

---

## 📁 Project Structure

```bash
ps1-fusion-dashboard/
├── backend/            # Tactical Hub (Node/Express)
│   ├── data/           # Mock Intel Databases (OSINT/HUMINT)
│   ├── routes/         # API Ingestion & Retrieval Layers
│   └── uploads/        # Imagery Storage
└── frontend/           # Operational View (React)
    ├── src/
    │   ├── components/ # Atomic UI Elements & Dashboard Layouts
    │   ├── hooks/      # Ingestion & Intelligence Hooks
    │   └── utils/      # Tactical Formatters & Parsers
    └── public/         # Sample Tactical Files
```

---

## 🌐 Deployment Documentation

### Backend (Render)
1. **Root Directory**: `ps1-fusion-dashboard/backend`
2. **Build Command**: `npm install`
3. **Start Command**: `node server.js`
4. **Required Variables**: 
   - `ALLOWED_ORIGINS` (Point to your Vercel frontend URL)

### Frontend (Vercel)
1. **Root Directory**: `ps1-fusion-dashboard/frontend`
2. **Framework**: `Vite`
3. **Required Variables**: 
   - `VITE_API_URL` (Point to your Render backend URL)

---

> [!IMPORTANT]
> **CLASSIFICATION NOTICE**: This dashboard is restricted for the use of authorized CyberJoar personnel only. All data transmissions are monitored as part of the strategic integrity protocol.

=== FILE COMPLETE ===
