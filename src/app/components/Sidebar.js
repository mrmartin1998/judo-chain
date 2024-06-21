import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md overflow-y-auto">
      <div className="px-4 py-6">
        <h2 className="text-3xl font-bold text-gray-900">Edit Profile</h2>
      </div>
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-4">
          <li>
            <Link href="/edit/personal-information" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Personal Information</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/profile-picture" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Profile Picture</a>
            </Link>
          </li>
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
            <Link href="/edit/social-media" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Social Media & Other Sites</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/gallery" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Gallery</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/videos" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Videos</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/superfight-status" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Superfight Status</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/instructional-videos" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Instructional Videos</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/seminars" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Seminars, Camps & Workshops</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/links" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Links</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/coaches-students-academies" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Coaches, Students & Academies</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/competition-medals" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Competition Medals</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/competition-matches" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Competition Matches</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/injuries" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Injuries</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/lineage" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Lineage</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/claim-url" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Claim Short URL</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/verification-overview" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Verification Overview</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/settings" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Settings</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/change-password" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Change Password</a>
            </Link>
          </li>
          <li>
            <Link href="/edit/deactivate-delete" legacyBehavior>
              <a className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md block font-medium">Deactivate / Delete Profile</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
