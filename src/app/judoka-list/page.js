"use client";

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import judokaRegistryInstance from '../utils/contract'; // Correct import

export default function JudokaList() {
  const [judokas, setJudokas] = useState([]);

  useEffect(() => {
    const fetchAllJudokas = async () => {
      try {
        console.log("Fetching all judokas...");
        console.log("Contract instance:", judokaRegistryInstance);

        // Check if the method exists
        if (judokaRegistryInstance.methods.getAllJudokas) {
          const userAddresses = await judokaRegistryInstance.methods.getAllJudokas().call();
          console.log("User addresses fetched:", userAddresses);

          const users = await Promise.all(
            userAddresses.map(async (address) => {
              const user = await judokaRegistryInstance.methods.getJudoka(address).call();
              console.log(`Fetched data for address ${address}:`, user);
              return {
                address,
                firstName: user.firstName,
                lastName: user.lastName,
                beltLevel: user.promotions.length > 0 ? user.promotions[user.promotions.length - 1].beltLevel : 'N/A',
              };
            })
          );
          console.log("Users fetched:", users);
          setJudokas(users);
        } else {
          console.error("getAllJudokas method does not exist on the contract");
        }
      } catch (error) {
        console.error("Error fetching judokas:", error);
      }
    };

    fetchAllJudokas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <header className="bg-white shadow-md mb-6">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Judoka List</h1>
          </div>
        </header>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Registered Users</h2>
          <ul className="list-disc list-inside text-gray-700">
            {judokas.length > 0 ? (
              judokas.map((judoka, index) => (
                <li key={index} className="mb-2">
                  <span className="text-blue-500">{judoka.firstName} {judoka.lastName} - {judoka.beltLevel}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-700">No registered users found.</p>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
