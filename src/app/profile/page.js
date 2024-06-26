"use client";

import { useEffect, useState } from 'react';
import web3 from '../utils/web3';
import { judokaRegistryContract } from '../utils/contract';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Link from 'next/link';

export default function ProfilePage() {
  const [account, setAccount] = useState('');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    beltLevel: '',
    promotionDate: '',
    gym: ''
  });
  const [promotionHistory, setPromotionHistory] = useState([]);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchProfileData(accounts[0]);
        fetchPromotionHistory(accounts[0]);
      }
    };

    const fetchProfileData = async (address) => {
      const data = await judokaRegistryContract.methods.getJudoka(address).call();
      if (data.promotions.length > 0) {
        const latestPromotion = data.promotions[data.promotions.length - 1];
        setProfileData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          beltLevel: latestPromotion.beltLevel,
          promotionDate: latestPromotion.promotionDate,
          gym: latestPromotion.gym
        });
      }
    };

    const fetchPromotionHistory = async (address) => {
      const history = await judokaRegistryContract.methods.getJudokaPromotions(address).call();
      const filteredHistory = history.filter(promotion => promotion.beltLevel && promotion.promotionDate && promotion.gym);
      setPromotionHistory(filteredHistory.reverse()); // reverse to show the most recent first
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <header className="bg-white shadow-md mb-6">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Judo-Chain, {profileData.firstName || 'User'}</h1>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Profile address={account} /> {/* Use the Profile component */}
          
          <div className="bg-white shadow rounded-lg p-6 col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Wall</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <textarea
                className="w-full bg-white p-2 rounded-lg border border-gray-300 text-black"
                rows="3"
                placeholder="Leave a message..."
              ></textarea>
              <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Post
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Gallery</h2>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Edit Gallery
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-6 col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Promotion History</h2>
            <ul>
              {promotionHistory.map((promotion, index) => (
                <li key={index} className="mb-4">
                  <p><strong>Belt Level:</strong> {promotion.beltLevel}</p>
                  <p><strong>Promotion Date:</strong> {promotion.promotionDate}</p>
                  <p><strong>Gym:</strong> {promotion.gym}</p>
                </li>
              ))}
            </ul>
            <Link href="/edit/promotion-history" legacyBehavior>
              <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                Update Promotion History
              </a>
            </Link>
          </div>

          <div className="bg-white shadow rounded-lg p-6 col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Votes Received</h2>
            <p className="text-gray-700">Voting not yet open for your profile!</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6 col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Training History</h2>
            <p className="text-gray-700">No training history logged for this user</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6 col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Medals</h2>
            <p className="text-gray-700">No medals recorded</p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update Medals Record
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-6 col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Competition Record</h2>
            <p className="text-gray-700">No matches recorded</p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update Competition Record
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-6 col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
            <p className="text-gray-700">No achievements recorded</p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update Achievements Record
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
