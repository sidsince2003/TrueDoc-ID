import Link from 'next/link';

const Sidebar = () => (
  <div className="w-64 bg-white shadow-md">
    <nav className="p-4">
      <ul>
        <li className="mb-2">
          <Link href="/dashboard/issuer" className="block px-4 py-2 hover:bg-gray-200 rounded">
            Issuer Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/dashboard/verifier" className="block px-4 py-2 hover:bg-gray-200 rounded">
            Verifier Dashboard
          </Link>
        </li>
        {/* Add more links for other roles */}
      </ul>
    </nav>
  </div>
);

export default Sidebar;