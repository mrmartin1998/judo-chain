'use client';

import { useState, useEffect } from 'react';
import web3 from '../../utils/web3';
import { judokaRegistryContract } from '../../utils/contract';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Academy = () => {
  const [account, setAccount] = useState('');
  const [academy, setAcademy] = useState('');

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchAcademyInfo(accounts[0]);
      }
    };

    const fetchAcademyInfo = async (address) => {
      try {
        const data = await judokaRegistryContract.methods.getJudoka(address).call();
        if (data && data.academy) {
          setAcademy(data.academy);
        }
      } catch (error) {
        console.error("Error fetching academy information:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleInputChange = (e) => {
    setAcademy(e.target.value);
  };

  const handleSave = async () => {
    try {
      await judokaRegistryContract.methods.updateAcademy(academy).send({ from: account });
      alert('Academy information updated successfully');
    } catch (error) {
      console.error("Error updating academy information:", error);
      alert('Failed to update academy information');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Academy and Affiliation</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Academy</label>
              <input
                type="text"
                name="academy"
                value={academy}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
                placeholder="Name of academy"
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

export default Academy;
