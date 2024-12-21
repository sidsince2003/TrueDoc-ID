// src/app/dashboard/verifier/components/Stats.tsx
interface StatsProps {
  totalVerifications: number;
  verifiedCount: number;
  rejectedCount: number;
  averageScore: number;
  verificationRate: number;
}

export default function Stats({
  totalVerifications,
  verifiedCount,
  rejectedCount,
  averageScore,
  verificationRate
}: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-sm font-medium text-gray-600">Total Verifications</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">{totalVerifications}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-sm font-medium text-gray-600">Verified Documents</p>
        <p className="mt-2 text-3xl font-bold text-green-600">{verifiedCount}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-sm font-medium text-gray-600">Rejected Documents</p>
        <p className="mt-2 text-3xl font-bold text-red-600">{rejectedCount}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-sm font-medium text-gray-600">Average Score</p>
        <p className="mt-2 text-3xl font-bold text-blue-600">{averageScore.toFixed(1)}%</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-sm font-medium text-gray-600">Verification Rate</p>
        <p className="mt-2 text-3xl font-bold text-indigo-600">{verificationRate.toFixed(1)}%</p>
      </div>
    </div>
  );
}