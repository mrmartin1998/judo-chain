'use client';

import { useState, useEffect } from 'react';
import web3 from '../../utils/web3';
import { judokaRegistryContract } from '../../utils/contract';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const ProfilePicture = () => {
  const [account, setAccount] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    // Implement the logic to upload the file to a server or IPFS
    // and get the URL of the uploaded file

    const fileUrl = 'https://example.com/uploaded-file-url'; // Replace this with actual upload logic

    try {
      // Assuming the smart contract has a function to update profile picture URL
      await judokaRegistryContract.methods.updateProfilePicture(fileUrl).send({ from: account });
      alert('Profile picture updated successfully');
    } catch (error) {
      console.error('Error updating profile picture:', error);
      alert('Failed to update profile picture');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Profile Picture</h2>
            <p className="mb-4 text-black">
              Please note, that in order to verify your identity, your uploaded profile picture must clearly show your face and no one else's.
            </p>
            <div className="mb-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full text-black"
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

export default ProfilePicture;
