'use client';

interface DocumentCardProps {
  document: {
    id: string;
    name: string;
    date: string;
    status: string;
    issuer: string;
    type: string;
  };
}

const DocumentCard = ({ document }: DocumentCardProps) => (
  <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-lg">{document.name}</h3>
        <p className="text-gray-500 text-sm">Type: {document.type}</p>
        <p className="text-gray-500 text-sm">Issued by: {document.issuer}</p>
        <p className="text-gray-500 text-sm">Date: {document.date}</p>
      </div>
      <span
        className={`px-3 py-1 text-sm rounded-full ${
          document.status === 'Verified'
            ? 'bg-green-100 text-green-800'
            : document.status === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {document.status}
      </span>
    </div>
    <div className="mt-4 flex justify-end space-x-2">
      <button className="text-blue-600 hover:text-blue-800 text-sm">
        View
      </button>
      {document.status === 'Verified' && (
        <button className="text-green-600 hover:text-green-800 text-sm">
          Share
        </button>
      )}
    </div>
  </div>
);

export default DocumentCard;