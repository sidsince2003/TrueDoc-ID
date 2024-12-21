// src/app/dashboard/verifier/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { verifierService } from '../../services/verifierService';
import Stats from './components/Stats';
import DocumentTable from './components/DocumentTable';
import SearchBar from './components/SearchBar';
import VerificationModal from './components/VerificationModal';
import Alert from './components/Alert';
import { Document, VerificationStats, VerificationResult } from '../../types';

export default function VerifierDashboard() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [stats, setStats] = useState<VerificationStats>({
    totalVerifications: 0,
    verifiedCount: 0,
    rejectedCount: 0,
    averageScore: 0,
    verificationRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    fetchDashboardData();
  }, [currentPage]);

  

  const showNotification = (message: string, type: 'success' | 'error') => {
    setAlert({
      show: true,
      message,
      type
    });
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const fetchDashboardData = async () => {
  try {
    setIsLoading(true);
    const [verificationHistory, dashboardStats] = await Promise.all([
      verifierService.getVerificationHistory(currentPage),
      verifierService.getDashboardStats()
    ]);

    setDocuments(verificationHistory.verifications);
    // setStats(dashboardStats);
  } catch (error) {
    showNotification('Failed to fetch dashboard data', 'error');
  } finally {
    setIsLoading(false);
  }
};



  const handleVerificationComplete = async (result: VerificationResult) => {
    await fetchDashboardData();
    setShowModal(false);
    setSelectedDocument(null);
    
    showNotification(
      result.status === 'verified' 
        ? 'Document verified successfully' 
        : 'Document verification failed',
      result.status === 'verified' ? 'success' : 'error'
    );
  };

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {alert.show && (
        <Alert 
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(prev => ({ ...prev, show: false }))}
        />
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        <Stats {...stats} />

        <div className="flex justify-between items-center">
          <SearchBar onSearch={setSearchTerm} />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <DocumentTable
            documents={filteredDocuments}
            onVerify={(doc: Document) => {
              setSelectedDocument(doc);
              setShowModal(true);
            }}
          />
        )}

        {showModal && (
          <VerificationModal
            document={selectedDocument}
            onClose={() => setShowModal(false)}
            onVerificationComplete={handleVerificationComplete}
          />
        )}
      </div>
    </div>
  );
}