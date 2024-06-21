'use client';

import { useState, useEffect } from 'react';
import web3 from '../../utils/web3';
import { judokaRegistryContract } from '../../utils/contract';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const SocialMedia = () => {
  const [account, setAccount] = useState('');
  const [socialMedia, setSocialMedia] = useState({
    instagram: '',
    facebook: '',
    youtube: ''
  });

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchSocialMediaInfo(accounts[0]);
      }
    };

    const fetchSocialMediaInfo = async (address) => {
      try {
        const data = await judokaRegistryContract.methods.getJudoka(address).call();
        if (data) {
          setSocialMedia({
            instagram: data.instagram || '',
            facebook: data.facebook || '',
            youtube: data.youtube || ''
          });
        }
      } catch (error) {
        console.error("Error fetching social media information:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialMedia({ ...socialMedia, [name]: value });
  };

  const handleSave = async () => {
    try {
      await judokaRegistryContract.methods.updateSocialMedia(
        socialMedia.instagram,
        socialMedia.facebook,
        socialMedia.youtube
      ).send({ from: account });

      alert('Social media information updated successfully');
    } catch (error) {
      console.error("Error updating social media information:", error);
      alert('Failed to update social media information');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Social Media & Other Sites</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Instagram account name</label>
              <input
                type="text"
                name="instagram"
                value={socialMedia.instagram}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
                placeholder="Account name only, no @ or links"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Facebook link</label>
              <input
                type="text"
                name="facebook"
                value={socialMedia.facebook}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
                placeholder="Facebook link"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">YouTube channel link</label>
              <input
                type="text"
                name="youtube"
                value={socialMedia.youtube}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
                placeholder="YouTube channel link"
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

export default SocialMedia;
