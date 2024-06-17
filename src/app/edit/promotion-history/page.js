'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import web3 from '../../utils/web3';
import contract from '../../utils/contract';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const PromotionHistory = () => {
  const [judoka, setJudoka] = useState({});
  const [newPromotion, setNewPromotion] = useState({
    beltLevel: '',
    promotionDate: null,
    gym: ''
  });

  useEffect(() => {
    const loadJudoka = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const data = await contract.methods.getJudoka(accounts[0]).call();
        setJudoka(data);
      }
    };
    loadJudoka();
  }, []);

  const handleUpdateJudoka = async () => {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      await contract.methods.updateJudoka(
        judoka.firstName,
        judoka.lastName,
        judoka.email,
        newPromotion.beltLevel,
        newPromotion.promotionDate.toISOString().split('T')[0], // convert date to string
        newPromotion.gym
      ).send({ from: accounts[0] });

      setJudoka({
        ...judoka,
        beltLevel: newPromotion.beltLevel,
        promotionDate: newPromotion.promotionDate.toISOString().split('T')[0],
        gym: newPromotion.gym
      });
      setNewPromotion({ beltLevel: '', promotionDate: null, gym: '' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Promotion History</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Belt Level</label>
              <select
                value={newPromotion.beltLevel}
                onChange={(e) => setNewPromotion({ ...newPromotion, beltLevel: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              >
                <option value="">Select Belt Level</option>
                <option value="White">White</option>
                <option value="Yellow">Yellow</option>
                <option value="Orange">Orange</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
                <option value="Brown">Brown</option>
                <option value="Black">Black</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Promotion Date</label>
              <DatePicker
                selected={newPromotion.promotionDate}
                onChange={(date) => setNewPromotion({ ...newPromotion, promotionDate: date })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                dateFormat="yyyy-MM-dd"
                popperClassName="react-datepicker-popper"
                calendarClassName="react-datepicker"
                dayClassName={() => "hover:bg-gray-200"}
                customInput={
                  <input
                    type="text"
                    style={{ color: 'black', backgroundColor: 'white' }}
                  />
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Gym</label>
              <input
                type="text"
                value={newPromotion.gym}
                onChange={(e) => setNewPromotion({ ...newPromotion, gym: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <button
              onClick={handleUpdateJudoka}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Judoka
            </button>
            <h3 className="text-xl font-bold mt-6 text-black">Existing Information</h3>
            <ul className="mt-4 text-black">
              <li className="border-b border-gray-200 py-2">
                <p><strong>Belt Level:</strong> {judoka.beltLevel}</p>
                <p><strong>Promotion Date:</strong> {judoka.promotionDate}</p>
                <p><strong>Gym:</strong> {judoka.gym}</p>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PromotionHistory;
