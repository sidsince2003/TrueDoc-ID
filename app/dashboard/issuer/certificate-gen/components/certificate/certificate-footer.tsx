import { formatDate, generateCertificateId } from "@/lib/utils/certificate";

export default function CertificateFooter() {
  return (
    <div className="text-center text-gray-600">
      <p>Issued on {formatDate()}</p>
      <p className="mt-2">Certificate ID: {generateCertificateId()}</p>
    </div>
  );
}