import axios from 'axios';
import { API_BASE_URL } from './constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getRecentlyViewed = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/recentlyViewed`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch recently viewed products');
  }
};

export const logProductView = async (userId, productId) => {
  try {
    await api.post(`/users/${userId}/productView`, { productId });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to log product view');
  }
};