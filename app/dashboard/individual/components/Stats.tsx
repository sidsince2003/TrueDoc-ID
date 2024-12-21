// app/dashboard/individual/components/Stats.tsx
'use client';

const Stats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-gray-500">Total Documents</h3>
      <p className="text-2xl font-bold">8</p>
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-gray-500">Pending Requests</h3>
      <p className="text-2xl font-bold">2</p>
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-gray-500">Shared Documents</h3>
      <p className="text-2xl font-bold">3</p>
    </div>
  </div>
);

export default Stats;