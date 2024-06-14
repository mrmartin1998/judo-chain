import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-4 text-2xl font-bold">Edit Profile</div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-2">
            <Link href="/edit/promotion-history" legacyBehavior>
              <a className="block p-2 bg-gray-700 rounded hover:bg-gray-600">Promotion History</a>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/edit/academy-affiliation" legacyBehavior>
              <a className="block p-2 bg-gray-700 rounded hover:bg-gray-600">Academy and Affiliation</a>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/edit/gallery" legacyBehavior>
              <a className="block p-2 bg-gray-700 rounded hover:bg-gray-600">Gallery</a>
            </Link>
          </li>
          {/* Add more sidebar items as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
