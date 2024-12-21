// src/app/types/document.ts

// Define specific structure for Aadhar card data
export interface AadharData {
  aadhar_number: string | null;
  name: string | null;
  dob: string | null;
}

// Define specific structure for PAN card data
export interface PANData {
  pan_number: string | null;
  name: string | null;
  dob: string | null;
  father_name: string | null;
}

// Union type for document data
export type DocumentData = AadharData | PANData;

// Main document verification interface
export interface DocumentVerification {
  file: File;
  documentType: 'Aadhar' | 'PAN';
  verificationScore?: number;
  verifiedData?: DocumentData;
  status?: 'pending' | 'verified' | 'rejected';
  verifiedAt?: string;
  hash?: string;
}

// Interface for verification result
export interface VerificationResult {
  score: number;
  message: string;
  data: DocumentData;
  status: 'success' | 'error';
  hash?: string;
}

// Interface for document listing
export interface DocumentListItem {
  id: string;
  hash: string;
  documentType: 'Aadhar' | 'PAN';
  status: 'pending' | 'verified' | 'rejected';
  verifiedAt: string;
  verificationScore: number;
}