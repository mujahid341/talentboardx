// API Configuration
// Automatically detects environment or you can manually override

// Auto-detect: uses 'production' when deployed, 'local' for localhost
const BACKEND_MODE = import.meta.env.MODE === 'production' && window.location.hostname !== 'localhost'
  ? 'production'
  : 'local';

// Manual override (uncomment to force a specific mode):
// const BACKEND_MODE = 'local'; // Options: 'local' or 'production'

const API_URLS = {
  local: 'http://localhost:5000',
  production: 'https://talentboardx.onrender.com',
};

const AI_API_URLS = {
  local: 'http://127.0.0.1:8000',
  production: 'https://talentboardx-ai-microservice.onrender.com',
};

export const API_BASE_URL = API_URLS[BACKEND_MODE];
export const API_ENDPOINT = `${API_BASE_URL}/api/v1`;
export const AI_API_URL = AI_API_URLS[BACKEND_MODE];
