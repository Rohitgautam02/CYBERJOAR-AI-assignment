/**
 * CyberJoar Strategic Fusion Dashboard
 * Formatting Utilities
 */

/**
 * Formats ISO date to high-tech display string.
 * Result: "15 APR 2026 | 08:23 UTC"
 */
export const formatTimestamp = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  
  return `${day} ${month} ${year} | ${hours}:${minutes} UTC`;
};

/**
 * Formats coordinates to tactical display string.
 * Result: "28.6139°N  77.2090°E"
 */
export const formatCoords = (lat, lng) => {
  const latVal = Math.abs(lat).toFixed(4);
  const lngVal = Math.abs(lng).toFixed(4);
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  
  return `${latVal}°${latDir}  ${lngVal}°${lngDir}`;
};

/**
 * Formats date for narrative reports.
 * Result: "Mon, 15 April 2026"
 */
export const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(isoString).toLocaleDateString(undefined, options);
};

/**
 * Returns a human-readable "time ago" string.
 */
export const timeAgo = (isoString) => {
  if (!isoString) return '';
  const seconds = Math.floor((new Date() - new Date(isoString)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

/**
 * Truncates string with ellipsis.
 */
export const truncate = (str, n) => {
  return (str?.length > n) ? str.slice(0, n - 1) + '...' : str;
};


