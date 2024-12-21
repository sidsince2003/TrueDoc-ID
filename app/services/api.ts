import axios, { AxiosError } from 'axios';
import { 
  LoginResponse, 
  SignupRequest, 
  DocumentUploadResponse, 
  VerificationResponse,
  DashboardResponse 
} from '../types/api';

// Flask Backend Base URL
const BASE_URL = "http://localhost:5000";

// === AUTHENTICATION API ===
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const signup = async (
  email: string, 
  password: string, 
  role: SignupRequest['role']
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, { email, password, role });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// === DOCUMENT API ===
export const uploadDocument = async (
  file: File, 
  uploader: string
): Promise<DocumentUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploader", uploader);

    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const verifyDocument = async (hash: string): Promise<VerificationResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/verify`, { hash });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// === DASHBOARD API ===
export const fetchDashboard = async (email: string): Promise<DashboardResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard`, { params: { email } });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// === AXIOS INTERCEPTORS ===
// Add authentication header to all requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);