'use client';

import { useEffect, useState } from 'react';
import web3 from '../../utils/web3';
import { judokaRegistryContract } from '../../utils/contract';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const ClaimURL = () => {
  const [account, setAccount] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchUrl(accounts[0]);
      }
    };

    const fetchUrl = async (address) => {
      try {
        const data = await judokaRegistryContract.methods.getJudoka(address).call();
        if (data) {
          setUrl(data.url || 'https://www.beltchecker.com/user/');
        }
      } catch (error) {
        console.error("Error fetching URL:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSave = async () => {
    try {
      await judokaRegistryContract.methods.updateJudokaURL(
        url
      ).send({ from: account });

      alert('URL updated successfully');
    } catch (error) {
      console.error("Error updating URL:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Claim Short URL</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Enter desired shortcut</label>
              <input
                type="text"
                name="url"
                value={url}
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

export default ClaimURL;
