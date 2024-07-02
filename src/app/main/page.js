'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import web3 from '../utils/web3';
import { judokaRegistryContract } from '../utils/contract';
import Forum from '../components/Forum'; // Import the Forum component

export default function Main() {
  const [account, setAccount] = useState('');
  const [topics, setTopics] = useState([]);
  const [judokas, setJudokas] = useState([]);

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Error loading accounts:", error);
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
        const userAddresses = await judokaRegistryContract.methods.getAllJudokas().call();
        const users = await Promise.all(
          userAddresses.map(async (address) => {
            const user = await judokaRegistryContract.methods.getJudoka(address).call();
            return {
              address,
              firstName: user.firstName,
              lastName: user.lastName,
              beltLevel: user.promotions.length > 0 ? user.promotions[user.promotions.length - 1].beltLevel : 'N/A',
            };
          })
        );
        setJudokas(users);
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
          <div className="col-span-1 bg-white shadow rounded-lg p-6">
            <Profile address={account} /> {/* Use Profile component */}
          </div>
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

          {/* Registered Judokas Section */}
          <div className="col-span-1 md:col-span-3 bg-white shadow rounded-lg p-6 mt-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Registered Judokas</h2>
            <ul className="list-disc list-inside text-gray-700">
              {judokas.length > 0 ? judokas.map((judoka, index) => (
                <li key={index} className="mb-2">
                  <Link href={`/profile/${judoka.address}`} legacyBehavior>
                    <a className="text-blue-500 hover:underline">{judoka.firstName} {judoka.lastName} - {judoka.beltLevel}</a>
                  </Link>
                </li>
              )) : (
                <p className="text-gray-700">No registered users found.</p>
              )}
            </ul>
          </div>

          {/* Forum Section */}
          <div className="col-span-1 md:col-span-3 bg-white shadow rounded-lg p-6 mt-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Forum</h2>
            <Forum allowPostCreation={false} /> {/* Render the Forum component without post creation */}
          </div>
        </div>
      </main>
    </div>
  );
}
