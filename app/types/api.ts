// src/app/types/api.ts

// === AUTH TYPES ===
export type UserRole = 'Individual' | 'Issuer' | 'Verifier';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  role: UserRole;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: User;
}

// === DOCUMENT TYPES ===
export interface DocumentUploadRequest {
  file: File;
  uploader: string;
  documentType: 'Aadhar' | 'PAN';
}

export interface DocumentUploadResponse {
  success: boolean;
  message: string;
  hash: string;
  url?: string;
  status: 'pending' | 'verified' | 'rejected';
}

export interface VerificationRequest {
  hash: string;
  documentType: 'Aadhar' | 'PAN';
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  isValid: boolean;
  score: number;
  verifiedData?: {
    documentType: string;
    extractedInfo: {
      name?: string;
      dob?: string;
      aadhar_number?: string;
      pan_number?: string;
      father_name?: string;
    };
  };
  hash: string;
  verifiedAt: string;
}

// === DASHBOARD TYPES ===
export interface DashboardStats {
  totalDocuments: number;
  pendingVerifications: number;
  verifiedDocuments: number;
  rejectedDocuments: number;
}

export interface DashboardDocument {
  id: string;
  hash: string;
  type: 'Aadhar' | 'PAN';
  status: 'pending' | 'verified' | 'rejected';
  uploader: string;
  verifiedAt?: string;
  verificationScore?: number;
}

export interface DashboardResponse {
  success: boolean;
  role: UserRole;
  stats?: DashboardStats;
  documents?: DashboardDocument[];
  issuedDocuments?: DashboardDocument[];
  message?: string;
}

// === ERROR TYPES ===
export interface ApiError {
  success: false;
  message: string;
  code?: string;
  details?: Record<string, string>;
}

// === API RESPONSE TYPE ===
export type ApiResponse<T> = {
  success: true;
  data: T;
  message?: string;
} | ApiError;