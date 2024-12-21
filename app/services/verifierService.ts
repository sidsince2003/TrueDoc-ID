// src/app/services/verifierService.ts
import {
  Document,
  VerificationResult,
  VerificationStats,
} from "../types/document";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const verifierService = {
  async verifyDocument(
    file: File,
    documentType: string,
    originalHash?: string
  ) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", documentType);
    if (originalHash) {
      formData.append("original_hash", originalHash);
    }

    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/api/verifier/verify-document`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Verification failed");
    }

    return response.json();
  },

  async getVerifications(page: number): Promise<{ verifications: Document[] }> {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/api/verifier/verifications?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch verifications");
    }

    return response.json();
  },

  async getDashboardStats(): Promise<{ stats: VerificationStats }> {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/api/verifier/dashboard-stats`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }

    return response.json();
  },
  async getVerificationHistory(
    page: number = 1,
    status?: string
  ): Promise<{ verifications: Document[]; totalPages: number }> {
    const token = localStorage.getItem("token");
    const url = `${API_BASE_URL}/api/verifier/verifications?page=${page}${
      status ? `&status=${status}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch verification history");
    }

    return response.json();
  },
};
