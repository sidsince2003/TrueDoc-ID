// src/app/dashboard/verifier/components/Alert.tsx
interface AlertProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
  }
  
  export default function Alert({ message, type, onClose }: AlertProps) {
    return (
      <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        <div className="flex items-center justify-between">
          <p>{message}</p>
          <button 
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }