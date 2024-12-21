'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Download, FileText } from 'lucide-react';

type Document = {
  name: string;
  verified: boolean;
  selected?: boolean;
};

const Shishir: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { name: "Aadhaar Card", verified: false, selected: false },
    { name: "PAN Card", verified: false, selected: false },
    { name: "Passport", verified: false, selected: false }
  ]);
  const [allDocumentsSelected, setAllDocumentsSelected] = useState(false);

  const handleDocumentSelection = (index: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index].selected = !updatedDocuments[index].selected;
    setDocuments(updatedDocuments);
    setAllDocumentsSelected(updatedDocuments.every((doc) => doc.selected));
  };

  const handleSelectAll = () => {
    const updatedDocuments = documents.map((doc) => ({ ...doc, selected: !allDocumentsSelected }));
    setDocuments(updatedDocuments);
    setAllDocumentsSelected(!allDocumentsSelected);
  };

  const handleDownloadDocuments = () => {
    const selectedDocuments = documents.filter((doc) => doc.selected);
    // Implement logic to download the selected documents
    console.log("Downloading documents:", selectedDocuments);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image 
            src="/logo.jpg" 
            alt="TrueDoc Logo" 
            width={250} 
            height={50} 
            className="h-10 w-auto"
          />
        </div>
        <ul className="flex space-x-6 text-gray-700">
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Home</li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Profile</li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Documents</li>
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 flex items-center">
            <Image
              src="/assets/Siddharth.JPG"
              alt="Ashi Sharma"
              width={120}
              height={120}
              className="rounded-full border-4 border-white mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">Siddharth Sharma</h1>
              <p className="text-blue-100">Digital Identity Verified</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 grid grid-cols-2 gap-4 text-black">
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Personal Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-black">Name:</span>{' '}
                  Siddharth Sharma
                </p>
                <p>
                  <span className="font-medium text-black">Date of Birth:</span>{' '}
                  28-04-2***
                </p>
                <p>
                  <span className="font-medium text-black">Gender:</span>{' '}
                  Male
                </p>
                <p>
                  <span className="font-medium text-black">Contact No.:</span>{' '}
                  *****3805
                </p>
              </div>
            </div>

            {/* Document Verification Section */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Document Verification</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={allDocumentsSelected}
                      onChange={handleSelectAll}
                      className="mr-3"
                    />
                    <span className="font-medium text-black">Select All</span>
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center"
                    onClick={handleDownloadDocuments}
                    disabled={documents.every((doc) => !doc.selected)}
                  >
                    <Download className="mr-1 h-4 w-4" /> Download
                  </button>
                </div>
                {documents.map((doc, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between bg-gray-100 p-3 rounded-md"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={doc.selected || false}
                        onChange={() => handleDocumentSelection(index)}
                        className="mr-3"
                      />
                      <FileText className={`mr-3 ${doc.verified ? 'text-green-500' : 'text-gray-400'}`} />
                      <span className={`${doc.verified ? 'text-green-700' : 'text-black'}`}>
                        {doc.name}
                      </span>
                    </div>
                    {doc.verified ? (
                      <CheckCircle2 className="text-green-500" />
                    ) : (
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center">
                        <Download className="mr-1 h-4 w-4" /> Download
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
          <div className="text-gray-500">
            © 2024 TrueDoc. All Rights Reserved.
          </div>
          <Image 
            src="/logo.jpg" 
            alt="TrueDoc Logo" 
            width={80} 
            height={30} 
            className="h-8 w-auto"
          />
        </div>
      </footer>
    </div>
  );
};

export default Shishir;