"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import web3 from '../utils/web3';
import contract from '../utils/contract';

export default function Main() {
  const [account, setAccount] = useState('');
  const [profileData, setProfileData] = useState({});
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchProfileData(accounts[0]);
      }
    };

    const fetchProfileData = async (address) => {
      const data = await contract.methods.getJudoka(address).call();
      setProfileData(data);
    };

    const fetchForumTopics = async () => {
      const response = await fetch('/api/forum/topics'); // Replace with actual API endpoint
      const data = await response.json();
      setTopics(data);
    };

    if (window.ethereum) {
      loadAccount();
    }

    fetchForumTopics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <header className="bg-white shadow-md mb-6">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Main Dashboard</h1>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Profile Section */}
          <div className="col-span-1 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
              <p className="text-gray-700"><strong>Name:</strong> {profileData.name || 'N/A'}</p>
              <p className="text-gray-700"><strong>Belt Level:</strong> {profileData.beltLevel || 'N/A'}</p>
              <div className="mt-4 flex flex-col space-y-2">
                <Link href="/training-history" legacyBehavior>
                  <a className="bg-blue-500 text-white py-2 px-4 rounded">View training history</a>
                </Link>
                <Link href="/profile" legacyBehavior>
                  <a className="bg-green-500 text-white py-2 px-4 rounded">View full profile</a>
                </Link>
              </div>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="col-span-2 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Welcome to Judo-Chain</h2>
            <p className="text-gray-700 mb-4">Your trusted platform for Judo belt verification.</p>
            <p className="text-gray-700 mb-4">Here you can manage your profile, participate in community voting, track your training progress, and more.</p>
            <p className="text-gray-700">Follow these steps to get started:</p>
            <ol className="list-decimal list-inside text-gray-700">
              <li>Complete your profile information.</li>
              <li>Request belt verification.</li>
              <li>Engage with the community for voting.</li>
              <li>Track and update your training progress.</li>
            </ol>
          </div>

          {/* Forum Topics Section */}
          <div className="col-span-1 md:col-span-3 bg-white shadow rounded-lg p-6 mt-4">
            <h2 className="text-xl font-bold mb-4">Latest Forum Topics</h2>
            <ul className="list-disc list-inside text-gray-700">
              {topics.length > 0 ? topics.map(topic => (
                <li key={topic.id} className="mb-2">
                  <Link href={`/forum/topic/${topic.id}`} legacyBehavior>
                    <a className="text-blue-500 hover:underline">{topic.title}</a>
                  </Link>
                </li>
              )) : (
                <p className="text-gray-700">No forum topics available.</p>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
