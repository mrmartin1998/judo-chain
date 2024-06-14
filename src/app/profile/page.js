"use client";

import { useEffect, useState } from 'react';
import web3 from '../utils/web3';
import contract from '../utils/contract';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Profile() {
  const [account, setAccount] = useState('');
  const [profileData, setProfileData] = useState({});

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

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <header className="bg-white shadow-md mb-6">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Judo-Chain, {profileData.name || 'User'}</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Your basic profile details.</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.name || 'N/A'}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.email || 'N/A'}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Current Belt Level</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.beltLevel || 'N/A'}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Instructions</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">How to use the platform.</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
              <div className="px-4 py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Step 1</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Complete your profile.</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Step 2</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Request belt verification.</dd>
                </div>
                <div className="px-4 py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Step 3</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Participate in community voting.</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Step 4</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Track your training progress.</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Training History</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about your training sessions.</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Latest Training Session</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Details about the latest training session...</dd>
                  </div>
                  {/* Add more training history details here */}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

