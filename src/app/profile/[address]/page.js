"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import contract from '../../utils/contract';

export default function Profile() {
  const { address } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      try {
        const data = await contract.methods.getJudoka(address).call();
        console.log("Fetched profile data:", data);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [address]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Profile data not found</h1>
          </div>
        </main>
      </div>
    );
  }

  // Filter out promotions with empty fields and reverse the order to show the latest first
  const promotionHistory = profileData.promotions
    .filter(promotion => promotion.beltLevel && promotion.promotionDate && promotion.gym)
    .reverse();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <header className="bg-white shadow-md mb-6">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile of {profileData.firstName} {profileData.lastName}</h1>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Basic Information Section */}
          <div className="col-span-1 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 text-center">Profile</h2>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
              <p className="text-gray-700"><strong>Name:</strong> {`${profileData.firstName || 'N/A'} ${profileData.lastName || ''}`}</p>
              <p className="text-gray-700"><strong>Belt Level:</strong> {profileData.promotions.length > 0 ? profileData.promotions[profileData.promotions.length - 1].beltLevel : 'N/A'}</p>
            </div>
          </div>

          {/* Wall Section */}
          <div className="col-span-2 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Wall</h2>
            <div>
              {/* Implement wall messages display and form for adding new messages */}
              <textarea className="w-full p-2 mb-4 border rounded" placeholder="Leave a message..." />
              <button className="bg-blue-500 text-white py-2 px-4 rounded">Post</button>
            </div>
          </div>

          {/* Promotion History Section */}
          <div className="col-span-1 md:col-span-3 bg-white shadow rounded-lg p-6 mt-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Promotion History</h2>
            <ul className="list-none text-gray-700">
              {promotionHistory.length > 0 ? promotionHistory.map((promotion, index) => (
                <li key={index} className="mb-2">
                  <p><strong>Belt Level:</strong> {promotion.beltLevel}</p>
                  <p><strong>Promotion Date:</strong> {promotion.promotionDate}</p>
                  <p><strong>Gym:</strong> {promotion.gym}</p>
                </li>
              )) : (
                <p className="text-gray-700">No promotion history available.</p>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
