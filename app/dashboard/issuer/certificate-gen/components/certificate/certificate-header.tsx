import { Award } from "lucide-react";

export default function CertificateHeader() {
  return (
    <div className="text-center mb-8">
      <Award className="w-16 h-16 mx-auto text-blue-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate of Verification</h1>
      <p className="text-gray-600">Document Authentication Service</p>
    </div>
  );
}