import { Card } from "../ui/card";
import CertificateHeader from "./certificate-header";
import DocumentList from "./document-list";
import CertificateFooter from "./certificate-footer";
import { parseDocuments } from "@/lib/utils/certificate";
import { toPng } from "html-to-image"; // import html-to-image
import { toast } from "sonner"; // Assuming you're using a toast library for notifications
import type { CertificateFormData } from "@/lib/validators/certificate";

interface CertificateProps {
  data: CertificateFormData;
}

export default function Certificate({ data }: CertificateProps) {
  const documents = parseDocuments(data.documents);

  // Function to handle image download
  const handleDownload = async () => {
    try {
      const certificate = document.getElementById("certificate");
      if (!certificate) {
        throw new Error("Certificate element not found");
      }

      const dataUrl = await toPng(certificate, { quality: 1.0 });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${data.name}_certificate.png`;
      link.click();
    } catch (error) {
      toast.error("Failed to download certificate.");
    }
  };

  // Function to send email (you need a backend API or email library like emailjs for this)
  const handleShare = async () => {
    try {
      const certificate = document.getElementById("certificate");
      if (!certificate) {
        throw new Error("Certificate element not found");
      }

      const dataUrl = await toPng(certificate, { quality: 1.0 });

      // Replace this with your actual email-sending logic (e.g., using emailjs)
      const response = await fetch("/api/send-certificate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email, // Use the email provided in the form
          certificateImage: dataUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      toast.success("Certificate sent via email successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to share certificate via email.");
    }
  };

  return (
    <Card id="certificate" className="p-12 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500" ></div>

      <CertificateHeader />

      <div className="mb-8 text-center">
        <p className="text-lg text-gray-700 mb-2">This certifies that</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{data.name}</h2>
        <p className="text-gray-600">{data.email}</p>
      </div>

      <DocumentList documents={documents} />

      <CertificateFooter />

      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500" />

      {/* Add Buttons for Download and Share */}
      <div className="mt-8 flex justify-between">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md"
          onClick={handleDownload}
        >
          Download Certificate
        </button>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-md"
          onClick={handleShare}
        >
          Share via Email
        </button>
      </div>
    </Card>
  );
}
