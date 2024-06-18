"use client";

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import web3 from '../utils/web3';
import { judokaRegistryInstance, votingContractInstance } from '../utils/contract';

export default function Vote() {
  const [account, setAccount] = useState('');
  const [judokas, setJudokas] = useState([]);
  const [selectedJudoka, setSelectedJudoka] = useState(null);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchJudokas();
      }
    };

    const fetchJudokas = async () => {
      try {
        // Fetch all registered judokas
        // This is just an example, adjust according to your contract logic
        const judokas = []; // Replace with actual fetch logic
        setJudokas(judokas);
      } catch (error) {
        console.error("Error fetching judokas:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleVote = async () => {
    if (!selectedJudoka) return;

    try {
      await votingContractInstance.methods.vote(selectedJudoka).send({ from: account });
      alert("Vote cast successfully!");
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <header className="bg-white shadow-md mb-6">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Vote on Judoka Belt Levels</h1>
          </div>
        </header>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Select a Judoka to Vote</h2>
          <div className="mb-4">
            <select
              onChange={(e) => setSelectedJudoka(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select Judoka</option>
              {judokas.map((judoka, index) => (
                <option key={index} value={judoka.address}>
                  {judoka.firstName} {judoka.lastName} - {judoka.beltLevel}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleVote}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Vote
          </button>
        </div>
      </main>
    </div>
  );
}
