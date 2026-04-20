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
2.  **CRITICAL Project Settings**:
    - **Root Directory**: `ps1-fusion-dashboard/frontend` ◀ **[YOU MUST SET THIS]**
    - **Framework Preset**: `Vite`
    - **Output Directory**: `dist`
3.  **Environment Variables**:
    - `VITE_API_URL`: `https://your-backend-subdomain.onrender.com` (The URL of your deployed PS1 Backend).

---

## 📊 Strategic Asset 2: Electoral Matrix (PS5)

### Deployment (Vercel)
1.  **New Project**: Connect your GitHub repository.
2.  **CRITICAL Project Settings**:
    - **Root Directory**: `ps5-electoral-matrix` ◀ **[YOU MUST SET THIS]**
    - **Framework Preset**: `Vite`
    - **Output Directory**: `dist`
3.  **Environment Variables**: None required for the static Beta version.

---

## 🧩 Vercel Monorepo Troubleshooting

> [!IMPORTANT]
> **Why do my builds fail?**
> If you connect Vercel to the root of the repository WITHOUT setting the **Root Directory**, Vercel will try to build the entire suite from the top level, which will fail if there are conflicting dependencies or no global build script. Always point Vercel directly to the subfolder.

> [!WARNING]
> **CORS Security**: The PS1 Backend will reject requests from your deployed Frontend unless the `ALLOWED_ORIGINS` environment variable is set correctly in the Backend dashboard.

---
**CyberJoar Strategic Group**
Operational Stability Protocol: OC.41335.2026
