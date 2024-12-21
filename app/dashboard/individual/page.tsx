"use client";

import { useState, useEffect } from "react";
import Stats from "./components/Stats";
import DocumentCard from "./components/DocumentCard";
import DocumentRequest from "./components/DocumentRequest";
import DocumentsList from "./components/DocumentsList";
import {
  FileText,
  Share2,
  Search,
  Filter,
  Upload,
  Download,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  date: string;
  status: "Verified" | "Pending" | "Rejected";
  issuer: string;
  type: "Aadhar" | "PAN" | string; 
  description?: string;
  uploader: string;
}

export default function IndividualDashboard() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [documents, setDocuments] = useState<Document[]>([
  {
    id: "1",
    name: "University Degree",
    date: "2024-03-15",
    status: "Verified",
    issuer: "ABC University",
    type: "Aadhar", // Matches the expected type
    uploader: "John Doe",
  },
  {
    id: "2",
    name: "Work Experience",
    date: "2024-03-14",
    status: "Pending",
    issuer: "XYZ Corp",
    type: "PAN", // Matches the expected type
    uploader: "Jane Smith",
  },
  {
    id: "3",
    name: "Certification",
    date: "2024-03-13",
    status: "Verified",
    issuer: "Microsoft",
    type: "Aadhar", // Matches the expected type
    uploader: "Michael Lee",
  },
]);


  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      doc.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
              <p className="text-gray-600 mt-1">
                Manage and track your verified documents
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowRequestModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                Request Document
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Documents
              </button>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="mt-6 flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats Section */}
        <Stats />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <button className="flex items-center justify-center p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Upload className="w-5 h-5 mr-2" />
            Upload Document
          </button>
          <button className="flex items-center justify-center p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Download All
          </button>
          <button className="flex items-center justify-center p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="w-5 h-5 mr-2" />
            Advanced Filters
          </button>
        </div>

        {/* Documents Grid/List View */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No documents match your search criteria
            </p>
          </div>
        )}

        {/* Document List View for Mobile */}
        <div className="md:hidden mt-6">
          {/* <DocumentsList documents={filteredDocuments} /> */}
        </div>
      </div>

      {/* Modals */}
      {showRequestModal && (
        <DocumentRequest onClose={() => setShowRequestModal(false)} />
      )}

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Share Documents</h2>
            {/* Share functionality to be implemented */}
            <button
              onClick={() => setShowShareModal(false)}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
