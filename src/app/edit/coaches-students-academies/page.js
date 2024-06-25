'use client';

import { useEffect, useState } from 'react';
import web3 from '../../utils/web3';
import { coachRegistryContract } from '../../utils/contract';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const CoachesStudentsAcademies = () => {
  const [account, setAccount] = useState('');
  const [coachName, setCoachName] = useState('');
  const [coachAddress, setCoachAddress] = useState('');
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchCoaches(accounts[0]);
      }
    };

    const fetchCoaches = async (address) => {
      try {
        const data = await coachRegistryContract.methods.getCoaches(address).call();
        if (data) {
          setCoaches(data);
        }
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "coachName") {
      setCoachName(value);
    } else if (name === "coachAddress") {
      setCoachAddress(value);
    }
  };

  const handleSaveCoach = async () => {
    try {
      await coachRegistryContract.methods.addCoach(coachAddress, coachName).send({ from: account });

      alert('Coach added successfully');
      setCoaches([...coaches, { name: coachName, coachAddress, status: 'Pending' }]);
      setCoachName('');
      setCoachAddress('');
    } catch (error) {
      console.error("Error adding coach:", error);
      alert('Failed to add coach');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Coaches</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Coach Name</label>
              <input
                type="text"
                name="coachName"
                value={coachName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Coach Address</label>
              <input
                type="text"
                name="coachAddress"
                value={coachAddress}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <button
              onClick={handleSaveCoach}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
            <h3 className="text-xl font-bold mt-6 text-black">Coaches List</h3>
            <table className="mt-4 w-full text-black">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {coaches.map((coach, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{coach.name}</td>
                    <td className="border px-4 py-2">{coach.coachAddress}</td>
                    <td className="border px-4 py-2">{coach.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoachesStudentsAcademies;
