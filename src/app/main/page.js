"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import web3 from '../utils/web3';
import contract from '../utils/contract';
import judokaRegistryInstance from '../utils/contract'; // Correct import

export default function Main() {
  const [account, setAccount] = useState('');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    beltLevel: 'N/A', // Initialize with 'N/A'
  });
  const [topics, setTopics] = useState([]);
  const [judokas, setJudokas] = useState([]);

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          fetchProfileData(accounts[0]);
        }
      } catch (error) {
        console.error("Error loading accounts:", error);
      }
    };

    const fetchProfileData = async (address) => {
      try {
        const data = await contract.methods.getJudoka(address).call();
        setProfileData({
          firstName: data.firstName,
          lastName: data.lastName,
          beltLevel: data.promotions.length > 0 ? data.promotions[data.promotions.length - 1].beltLevel : 'N/A', // Fetch the latest belt level
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchForumTopics = async () => {
      try {
        const response = await fetch('/api/forum/topics'); // Replace with actual API endpoint
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Error fetching forum topics:", error);
      }
    };

    const fetchAllJudokas = async () => {
      try {
        console.log("Fetching all judokas...");
        console.log("Contract instance:", judokaRegistryInstance);

        // Check if the method exists
        if (judokaRegistryInstance.methods.getAllJudokas) {
          const userAddresses = await judokaRegistryInstance.methods.getAllJudokas().call();
          console.log("User addresses fetched:", userAddresses);

          const users = await Promise.all(
            userAddresses.map(async (address) => {
              const user = await judokaRegistryInstance.methods.getJudoka(address).call();
              console.log(`Fetched data for address ${address}:`, user);
              return {
                address,
                firstName: user.firstName,
                lastName: user.lastName,
                beltLevel: user.promotions.length > 0 ? user.promotions[user.promotions.length - 1].beltLevel : 'N/A',
              };
            })
          );
          console.log("Users fetched:", users);
          setJudokas(users);
        } else {
          console.error("getAllJudokas method does not exist on the contract");
        }
      } catch (error) {
        console.error("Error fetching judokas:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }

    fetchForumTopics();
    fetchAllJudokas();
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
              <p className="text-gray-700"><strong>Name:</strong> {`${profileData.firstName || 'N/A'} ${profileData.lastName || ''}`}</p>
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

          {/* Judoka List Section */}
          <div className="col-span-1 md:col-span-3 bg-white shadow rounded-lg p-6 mt-4">
            <h2 className="text-xl font-bold mb-4">Registered Users</h2>
            <ul className="list-disc list-inside text-gray-700">
              {judokas.length > 0 ? (
                judokas.map((judoka, index) => (
                  <li key={index} className="mb-2">
                    <span className="text-blue-500">{judoka.firstName} {judoka.lastName} - {judoka.beltLevel}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-700">No registered users found.</p>
              )}
            </ul>
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
