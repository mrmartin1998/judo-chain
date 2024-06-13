"use client";

import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import web3 from '../utils/web3';
import contract from '../utils/contract';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });

export default function Main() {
  const [account, setAccount] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        checkUserRegistration(accounts[0]);
      }
    };

    const checkUserRegistration = async (address) => {
      try {
        const judoka = await contract.methods.getJudoka(address).call();
        setIsRegistered(judoka.isRegistered);
      } catch (error) {
        console.error("Error checking user registration:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Main Page - Judo-Chain</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white border-4 border-dashed border-gray-200 rounded-lg p-8 shadow-lg">
              <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Welcome to the Main Page</h1>
              <p className="text-lg text-center mb-6 text-gray-600">
                This is the main area of the Judo-Chain Dapp.
              </p>
              {account ? (
                isRegistered ? (
                  <p className="text-lg text-center mb-6 text-gray-600">
                    User is registered: {account}
                  </p>
                ) : (
                  <p className="text-lg text-center mb-6 text-gray-600">
                    User is not registered.
                  </p>
                )
              ) : (
                <p className="text-lg text-center mb-6 text-gray-600">
                  Please connect your MetaMask wallet.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
