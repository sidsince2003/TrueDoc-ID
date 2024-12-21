import { CheckCircle } from "lucide-react";

interface DocumentListProps {
  documents: string[];
}

export default function DocumentList({ documents }: DocumentListProps) {
  return (
    <div className="mb-8">
      <p className="text-center text-gray-700 mb-4">
        Has successfully verified the following documents:
      </p>
      <ul className="space-y-2">
        {documents.map((doc, index) => (
          <li key={index} className="flex items-center justify-center text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            {doc}
          </li>
        ))}
      </ul>
    </div>
  );
}