'use client';

const RoleSelector = () => (
  <div className="p-4">
    <select className="px-4 py-2 border rounded-md">
      <option>Issuer</option>
      <option>Verifier</option>
      <option>Individual</option>
    </select>
  </div>
);

export default RoleSelector;
