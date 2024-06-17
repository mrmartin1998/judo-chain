import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md">
      <div className="px-4 py-6">
        <h2 className="text-3xl font-bold text-gray-900">Edit Profile</h2>
      </div>
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-4">
          <li>
            <Link href="/edit/promotion-history" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Promotion History</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/academy-affiliation" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Academy and Affiliation</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/gallery" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Gallery</a>
            </Link>
          </li>
          {/* Add more sidebar items as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
