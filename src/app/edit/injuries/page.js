'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import web3 from '../../utils/web3';
import { injuryRegistryContract } from '../../utils/contract'; // Correct import
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Injuries = () => {
  const [account, setAccount] = useState('');
  const [injuries, setInjuries] = useState([]);
  const [newInjury, setNewInjury] = useState({
    name: '',
    description: '',
    areaOfBody: '',
    dateOfInjury: null,
    severity: ''
  });

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchInjuries(accounts[0]);
      }
    };

    const fetchInjuries = async (address) => {
      try {
        const data = await injuryRegistryContract.methods.getInjuries(address).call();
        if (data) {
          const formattedInjuries = data.map(injury => ({
            ...injury,
            dateOfInjury: new Date(injury.dateOfInjury)
          }));
          setInjuries(formattedInjuries);
        }
      } catch (error) {
        console.error("Error fetching injuries:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInjury({ ...newInjury, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewInjury({ ...newInjury, dateOfInjury: date });
  };

  const handleSaveInjury = async () => {
    try {
      await injuryRegistryContract.methods.addInjury(
        newInjury.name,
        newInjury.description,
        newInjury.areaOfBody,
        newInjury.dateOfInjury.toISOString().split('T')[0], // convert date to string
        newInjury.severity
      ).send({ from: account });

      setInjuries([...injuries, { ...newInjury, dateOfInjury: newInjury.dateOfInjury.toISOString().split('T')[0] }]);
      setNewInjury({
        name: '',
        description: '',
        areaOfBody: '',
        dateOfInjury: null,
        severity: ''
      });

      alert('Injury saved successfully');
    } catch (error) {
      console.error("Error saving injury:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Add new injury record</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name of injury</label>
              <input
                type="text"
                name="name"
                value={newInjury.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={newInjury.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Area of body</label>
              <select
                name="areaOfBody"
                value={newInjury.areaOfBody}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              >
                <option value="">Select area</option>
                <option value="Head">Head</option>
                <option value="Neck">Neck</option>
                <option value="Shoulder">Shoulder</option>
                <option value="Arm">Arm</option>
                <option value="Elbow">Elbow</option>
                <option value="Wrist">Wrist</option>
                <option value="Hand">Hand</option>
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Abdomen">Abdomen</option>
                <option value="Hip">Hip</option>
                <option value="Thigh">Thigh</option>
                <option value="Knee">Knee</option>
                <option value="Shin">Shin</option>
                <option value="Ankle">Ankle</option>
                <option value="Foot">Foot</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date of injury (approximate)</label>
              <DatePicker
                selected={newInjury.dateOfInjury}
                onChange={handleDateChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                dateFormat="yyyy-MM-dd"
                popperClassName="react-datepicker-popper"
                calendarClassName="react-datepicker"
                dayClassName={() => "hover:bg-gray-200"}
                customInput={<input type="text" style={{ color: 'black', backgroundColor: 'white' }} />}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Severity of injury when it happened</label>
              <select
                name="severity"
                value={newInjury.severity}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              >
                <option value="Mild">Mild</option>
                <option value="Medium">Medium</option>
                <option value="Severe">Severe</option>
              </select>
            </div>
            <button
              onClick={handleSaveInjury}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save injury
            </button>
          </div>
          <div className="bg-white p-4 shadow rounded mt-6">
            <h3 className="text-xl font-bold mb-4 text-black">Injury History</h3>
            <table className="min-w-full bg-white text-black">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Description</th>
                  <th className="py-2">Area of Body</th>
                  <th className="py-2">Date of Injury</th>
                  <th className="py-2">Severity</th>
                </tr>
              </thead>
              <tbody>
                {injuries.map((injury, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{injury.name}</td>
                    <td className="border px-4 py-2">{injury.description}</td>
                    <td className="border px-4 py-2">{injury.areaOfBody}</td>
                    <td className="border px-4 py-2">{injury.dateOfInjury instanceof Date ? injury.dateOfInjury.toISOString().split('T')[0] : injury.dateOfInjury}</td>
                    <td className="border px-4 py-2">{injury.severity}</td>
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

export default Injuries;
