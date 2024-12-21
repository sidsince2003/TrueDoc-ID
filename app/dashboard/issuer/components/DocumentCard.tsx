'use client';

interface DocumentCardProps {
  document: {
    id: string;
    name: string;
    date: string;
    status: string;
  };
}

const DocumentCard = ({ document }: DocumentCardProps) => (
  <div className="p-4 bg-white shadow-md rounded-lg">
    <h3 className="font-bold">{document.name}</h3>
    <p className="text-gray-500">Issued: {document.date}</p>
    <span
      className={`px-2 py-1 text-sm rounded ${
        document.status === 'Verified'
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
      }`}
    >
      {document.status}
    </span>
  </div>
);

export default DocumentCard;
