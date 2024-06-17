"use client";

import { useEffect, useState } from 'react';
import web3 from '../utils/web3';
import contract from '../utils/contract';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Profile() {
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
      const data = await contract.methods.getJudoka(address).call();
      setProfileData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        beltLevel: data.promotions[data.promotions.length - 1].beltLevel, // get the latest belt level
        promotionDate: data.promotions[data.promotions.length - 1].promotionDate, // get the latest promotion date
        gym: data.promotions[data.promotions.length - 1].gym // get the latest gym
      });
    };

    const fetchPromotionHistory = async (address) => {
      const history = await contract.methods.getJudokaPromotions(address).call();
      setPromotionHistory(history.reverse()); // reverse to show the most recent first
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
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
              <p className="text-xl font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</p>
              <p className="text-gray-700">{profileData.beltLevel}</p>
              <Link href="/profile/edit" legacyBehavior>
                <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                  Edit Profile
                </a>
              </Link>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 col-span-2">
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
