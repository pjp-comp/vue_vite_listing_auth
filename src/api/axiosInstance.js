// src/api/axiosInstance.js

import axios from 'axios';

export function isTokenExpired(token) {
  if (!token) return true;
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
}

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await axios.post('https://dummyjson.com/auth/refresh', {
      refreshToken,
      expiresInMins: 5
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data.accessToken;
  } catch (error) {
    console.error('Token refresh failed', error);
    throw new Error('Token refresh failed');
  }
}

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken || isTokenExpired(accessToken)) {
      try {
        accessToken = await refreshAccessToken();
      } catch (error) {
        console.warn('Redirect to login or logout here if needed');
        throw error;
      }
    }

    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
