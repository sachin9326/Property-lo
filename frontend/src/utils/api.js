import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 60000, // 60 second timeout to handle Render cold starts smoothly
});

// Helper to resolve image URLs (handles relative paths from backend)
export const getImageUrl = (path) => {
  if (!path) return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=60';
  if (path.startsWith('http')) return path;
  // Property images are served from frontend public folder, not backend
  if (path.startsWith('/property-images/')) return path;
  const base = API_BASE_URL;
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
};

console.log('API Base URL:', API_BASE_URL);

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Automatic retry for GET requests on timeout or network cold-start errors
api.interceptors.response.use(undefined, async (err) => {
  const { config } = err;
  if (!config || !config.method || config.method.toLowerCase() !== 'get') {
    return Promise.reject(err);
  }
  config.__retryCount = config.__retryCount || 0;
  if (config.__retryCount < 2 && (err.code === 'ECONNABORTED' || !err.response)) {
    config.__retryCount += 1;
    console.log(`🔄 Retrying GET request (${config.__retryCount}/2): ${config.url}`);
    await new Promise(r => setTimeout(r, 2000));
    return api(config);
  }
  return Promise.reject(err);
});

// ============================================================
// Backend wake-up / warmup utility
// Non-blocking background health check
// ============================================================
let backendReadyPromise = null;

export const ensureBackendReady = () => {
  if (backendReadyPromise) return backendReadyPromise;
  
  backendReadyPromise = new Promise(async (resolve) => {
    const targetUrl = `${API_BASE_URL}/api/health`;
    for (let i = 0; i < 2; i++) {
      try {
        await axios.get(targetUrl, { timeout: 45000 });
        console.log('✅ Backend is awake & ready');
        resolve(true);
        return;
      } catch (e) {
        console.log(`⏳ Backend cold-start ping attempt ${i + 1}/2...`);
        if (i < 1) await new Promise(r => setTimeout(r, 2000));
      }
    }
    console.warn('⚠️ Backend health check timed out, proceeding with direct queries');
    resolve(false);
  });
  
  return backendReadyPromise;
};

// Fire background warmup immediately when app loads
ensureBackendReady();

export default api;
