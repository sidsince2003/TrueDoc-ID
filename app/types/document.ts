// src/app/types/document.ts
export interface Document {
  id: string;
  name: string;
  type: "Aadhar" | "PAN";
  uploader: string;
  hash?: string;
  date: string;
  status: "pending" | "verified" | "rejected";
  issuer: string;
}

export interface DocumentVerification {
  file: File;
  documentType: "Aadhar" | "PAN";
  verificationScore?: number;
  verifiedData?: Record<string, string | null>;
}

export interface VerificationResult {
  success: boolean;
  message: string;
  score: number;
  blockchain_match: boolean;
  extracted_data: {
    [key: string]: string | null;
  };
  status: "verified" | "rejected";
  verification_id: string;
}

export interface VerificationStats {
  totalVerifications: number;
  verifiedCount: number;
  rejectedCount: number;
  averageScore: number;
  verificationRate: number;
}
