'use client';

const Stats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-gray-500">Total Issued</h3>
      <p className="text-2xl font-bold">120</p>
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-gray-500">Pending Requests</h3>
      <p className="text-2xl font-bold">15</p>
    </div>
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-gray-500">Verified Documents</h3>
      <p className="text-2xl font-bold">105</p>
    </div>
  </div>
);

export default Stats;
