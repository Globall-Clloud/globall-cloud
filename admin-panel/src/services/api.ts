import axios from 'axios';

// Base URL بۆ Backend API
// لە گەشەپێداندا CRA proxy داواکارییەکانی /api دەگوازێتەوە بۆ backend (port 5000)
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// هەموو داواکارییەک token زیاد دەکات ئەگەر هەبێت
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('gc_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ئەگەر token بەسەرچوو بوو، دەرچوون
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('gc_token');
      localStorage.removeItem('gc_user');
    }
    return Promise.reject(error);
  }
);

export interface AuthUser {
  id: string;
  customerCode?: string;
  name: string;
  phone: string;
  role: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: AuthUser;
}

export const authApi = {
  login: async (phone: string, password: string): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/auth/login', { phone, password });
    return data;
  },
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch {
      // بێدەنگ تێپەڕ دەبین
    }
  },
};

export default api;
