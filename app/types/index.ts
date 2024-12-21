// src/types/index.ts
export interface Document {
    id: string;
    name: string;
    type: 'Aadhar' | 'PAN';
    uploader: string;
    date: string;
    status: 'pending' | 'verified' | 'rejected';
    hash?: string;
    verificationScore?: number;
  }
  
  export interface VerificationStats {
    totalVerifications: number;
    verifiedCount: number;
    rejectedCount: number;
    averageScore: number;
    verificationRate: number;
  }
  
  export interface VerificationResult {
    success: boolean;
    message: string;
    score: number;
    blockchain_match: boolean;
    extracted_data: Record<string, string | null>;
    status: 'verified' | 'rejected';
    verification_id: string;
  }