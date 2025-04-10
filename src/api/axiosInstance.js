// src/api/axiosInstance.js

import axios from 'axios';

// Helper function to check if the token has expired
function isTokenExpired(token) {
  if (!token) return true;
  const decoded = JSON.parse(atob(token.split('.')[1]));  // Decode JWT token to check expiration
  const exp = decoded.exp * 1000;  // Convert expiration time to milliseconds
  return exp < Date.now();  // Return true if the token is expired
}

// Refresh token logic
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await axios.post('https://dummyjson.com/auth/refresh', { refreshToken });
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error('Token refresh failed', error);
    throw new Error('Token refresh failed');
  }
}

// Create an axios instance
const api = axios.create({
  baseURL: 'https://dummyjson.com/',  // Change this to your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set up an Axios request interceptor to check token expiry
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (isTokenExpired(accessToken)) {
      try {
        const newAccessToken = await refreshAccessToken();
        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
      } catch (error) {
        console.error('Could not refresh token', error);
      }
    } else {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
