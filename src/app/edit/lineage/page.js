'use client';

import { useEffect, useState } from 'react';
import web3 from '../../utils/web3';
import { judokaRegistryContract } from '../../utils/contract';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Lineage = () => {
  const [account, setAccount] = useState('');
  const [lineage, setLineage] = useState('');

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchLineage(accounts[0]);
      }
    };

    const fetchLineage = async (address) => {
      try {
        const data = await judokaRegistryContract.methods.getJudoka(address).call();
        if (data) {
          setLineage(data.lineage || '');
        }
      } catch (error) {
        console.error("Error fetching lineage:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleInputChange = (e) => {
    setLineage(e.target.value);
  };

  const handleSave = async () => {
    try {
      await judokaRegistryContract.methods.updateJudoka(
        lineage // assuming the function has a parameter for lineage
      ).send({ from: account });

      alert('Lineage updated successfully');
    } catch (error) {
      console.error("Error updating lineage:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Lineage</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Enter your lineage</label>
              <input
                type="text"
                name="lineage"
                value={lineage}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Lineage;
