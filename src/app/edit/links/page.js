'use client';

import { useEffect, useState } from 'react';
import web3 from '../../utils/web3';
import { judokaRegistryContract } from '../../utils/contract';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Links = () => {
  const [account, setAccount] = useState('');
  const [linkInfo, setLinkInfo] = useState({
    linkText: '',
    url: ''
  });
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchLinks(accounts[0]);
      }
    };

    const fetchLinks = async (address) => {
      try {
        const data = await judokaRegistryContract.methods.getLinks(address).call();
        if (data) {
          setLinks(data);
        }
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLinkInfo({ ...linkInfo, [name]: value });
  };

  const handleSave = async () => {
    try {
      await judokaRegistryContract.methods.addLink(
        linkInfo.linkText,
        linkInfo.url
      ).send({ from: account });

      alert('Link saved successfully');
      setLinks([...links, {
        linkText: linkInfo.linkText,
        url: linkInfo.url
      }]);
      setLinkInfo({ linkText: '', url: '' });
    } catch (error) {
      console.error("Error saving link:", error);
      alert('Failed to save link');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Links to Display on Your Profile</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Link Text</label>
              <input
                type="text"
                name="linkText"
                value={linkInfo.linkText}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">URL</label>
              <input
                type="text"
                name="url"
                value={linkInfo.url}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Link
            </button>
            <h3 className="text-xl font-bold mt-6 text-black">Saved Links</h3>
            <ul className="mt-4 text-black">
              {links.map((link, index) => (
                <li key={index} className="mb-4">
                  <p><strong>Text:</strong> {link.linkText}</p>
                  <p><strong>URL:</strong> <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{link.url}</a></p>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Links;
