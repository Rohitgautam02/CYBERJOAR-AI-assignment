/**
 * CyberJoar Electoral Intelligence Matrix
 * Application Entry (PS5 Standard)
 * UPDATED: Added Leaflet CSS for suite consistency.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Required for suite-wide map compatibility (Requirement 5)
// NOTE: Run 'npm install' to enable mapping assets
// import 'leaflet/dist/leaflet.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
