"use client";

import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import web3 from './utils/web3';
import contract from './utils/contract';

const Navbar = dynamic(() => import('./components/Navbar'), { ssr: false });

export default function Home() {
  const [account, setAccount] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        checkUserRegistration(accounts[0]);
      }

      window.ethereum.on('accountsChanged', function (accounts) {
        setAccount(accounts[0]);
        checkUserRegistration(accounts[0]);
      });
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
  
  const handleRegister = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const beltLevel = e.target.beltLevel.value;

    try {
      await contract.methods.registerJudoka(firstName, lastName, email, beltLevel)
        .send({ from: account });
      setIsRegistered(true);
    } catch (error) {
      console.error("Error registering judoka:", error);
    }
  };

  const goToDapp = () => {
    router.push('/main');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Judo-Chain</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border-4 border-dashed border-gray-200 rounded-lg p-8 shadow-lg">
                <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Welcome to Judo-Chain</h1>
                <p className="text-lg text-center mb-6 text-gray-600">
                  Your trusted platform for Judo belt verification.
                </p>
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Introduction</h2>
                  <p className="text-lg text-gray-600">
                    Judo-Chain leverages blockchain technology to ensure transparency and security in verifying Judo practitioners' belt ranks through community voting and immutable records.
                  </p>
                </section>
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Features</h2>
                  <ul className="list-disc pl-5 text-lg text-gray-600">
                    <li>Transparent belt verification</li>
                    <li>Community-driven voting</li>
                    <li>Secure and immutable records</li>
                    <li>User profile management</li>
                    <li>Event creation and management</li>
                    <li>Training logs and statistics</li>
                  </ul>
                </section>
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">How It Works</h2>
                  <ol className="list-decimal pl-5 text-lg text-gray-600">
                    <li>Register and create your profile.</li>
                    <li>Request belt verification.</li>
                    <li>Community votes on your verification request.</li>
                    <li>Track your training progress and participate in events.</li>
                  </ol>
                </section>
              </div>
              <div className="bg-white border-4 border-dashed border-gray-200 rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Register Profile</h2>
                {account ? (
                  isRegistered ? (
                    <div className="flex flex-col items-center">
                      <p className="text-lg mb-4 text-gray-600">Connected wallet: {account}</p>
                      <p className="text-lg mb-4 text-gray-600">User is registered</p>
                      <button
                        onClick={goToDapp}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Go to Dapp
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleRegister}>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          First name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Current belt level
                        </label>
                        <select
                          name="beltLevel"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        >
                          <option>White belt</option>
                          <option>Blue belt</option>
                          <option>Purple belt</option>
                          <option>Brown belt</option>
                          <option>Black belt</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Register
                      </button>
                    </form>
                  )
                ) : (
                  <p>Please connect your MetaMask wallet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
