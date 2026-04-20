# CyberJoar Intelligence Suite: Deployment Protocol

This document outlines the tactical deployment steps for the CyberJoar Strategic Assets across production platforms.

---

## 🏗 Deployment Strategy

| Asset | Type | Platform | Location |
| :--- | :--- | :--- | :--- |
| **PS1 Frontend** | React/Vite | **Vercel** | `ps1-fusion-dashboard/frontend` |
| **PS1 Backend** | Node/Express | **Render** | `ps1-fusion-dashboard/backend` |
| **PS5 Frontend** | React/Vite | **Vercel** | `ps5-electoral-matrix` |

---

## 🛰 Strategic Asset 1: Fusion Dashboard (PS1)

### Phase A: Backend Hub (Render/Railway)
1.  **New Web Service**: Connect your GitHub repository.
2.  **Root Directory**: `ps1-fusion-dashboard/backend`
3.  **Build Command**: `npm install`
4.  **Start Command**: `node server.js`
5.  **Environment Variables**:
    - `PORT`: `10000` (Render handles this automatically)
    - `ALLOWED_ORIGINS`: `https://your-frontend-subdomain.vercel.app` (The URL of your deployed PS1 Frontend).

### Phase B: Frontend View (Vercel)
1.  **New Project**: Connect your GitHub repository.
2.  **Root Directory**: `ps1-fusion-dashboard/frontend`
3.  **Framework Preset**: `Vite`
4.  **Environment Variables**:
    - `VITE_API_URL`: `https://your-backend-subdomain.onrender.com/api` (The URL of your deployed PS1 Backend).

---

## 📊 Strategic Asset 2: Electoral Matrix (PS5)

### Deployment (Vercel)
1.  **New Project**: Connect your GitHub repository.
2.  **Root Directory**: `ps5-electoral-matrix` (or use the root and set the directory in Vercel settings).
3.  **Framework Preset**: `Vite`
4.  **Environment Variables**: None required for the static Beta version.

---

## 🧩 Smooth Monorepo Tips

> [!IMPORTANT]
> **Vercel Root Settings**: When deploying subfolders in a monorepo, ensure the **Root Directory** is set correctly in the project settings. Do NOT deploy the entire monorepo as a single frontend project.

> [!WARNING]
> **CORS Security**: The PS1 Backend will reject requests from your deployed Frontend unless the `ALLOWED_ORIGINS` environment variable is set correctly in the Backend dashboard.

---
**CyberJoar Strategic Group**
Operational Stability Protocol: OC.41335.2026
