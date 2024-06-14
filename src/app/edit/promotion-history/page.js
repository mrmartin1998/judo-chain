"use client";

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import web3 from '../../utils/web3';
import contract from '../../utils/contract';

const PromotionHistory = () => {
  const [promotions, setPromotions] = useState([]);
  const [newPromotion, setNewPromotion] = useState({
    beltLevel: '',
    date: '',
    location: ''
  });

  useEffect(() => {
    const loadPromotions = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const data = await contract.methods.getPromotions(accounts[0]).call();
        setPromotions(data);
      }
    };
    loadPromotions();
  }, []);

  const handleAddPromotion = async () => {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      await contract.methods.addPromotion(newPromotion.beltLevel, newPromotion.date, newPromotion.location).send({ from: accounts[0] });
      setPromotions([...promotions, newPromotion]);
      setNewPromotion({ beltLevel: '', date: '', location: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Promotion History</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Belt Level</label>
              <input
                type="text"
                value={newPromotion.beltLevel}
                onChange={(e) => setNewPromotion({ ...newPromotion, beltLevel: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="text"
                value={newPromotion.date}
                onChange={(e) => setNewPromotion({ ...newPromotion, date: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={newPromotion.location}
                onChange={(e) => setNewPromotion({ ...newPromotion, location: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              onClick={handleAddPromotion}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Promotion
            </button>
            <h3 className="text-xl font-bold mt-6">Existing Promotions</h3>
            <ul className="mt-4">
              {promotions.map((promotion, index) => (
                <li key={index} className="border-b border-gray-200 py-2">
                  <p><strong>Belt Level:</strong> {promotion.beltLevel}</p>
                  <p><strong>Date:</strong> {promotion.date}</p>
                  <p><strong>Location:</strong> {promotion.location}</p>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PromotionHistory;
