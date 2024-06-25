'use client';

import { useEffect, useState } from 'react';
import web3 from '../../utils/web3';
import { profileManagementContract, judokaRegistryContract } from '../../utils/contract';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const PersonalInformation = () => {
  const [account, setAccount] = useState('');
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    birthday: '',
    makePublic: false,
    sex: '',
    state: '',
    city: '',
    country: '',
    description: ''
  });

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        await fetchPersonalInfo(accounts[0]);
      }
    };

    const fetchPersonalInfo = async (address) => {
      try {
        const basicInfo = await judokaRegistryContract.methods.getJudoka(address).call();
        const profileInfo = await profileManagementContract.methods.profiles(address).call();

        setPersonalInfo({
          firstName: basicInfo.firstName,
          middleName: profileInfo.personalInfo.middleName || '',
          lastName: basicInfo.lastName,
          email: basicInfo.email,
          birthday: profileInfo.personalInfo.birthday || '',
          makePublic: profileInfo.personalInfo.makePublic || false,
          sex: profileInfo.personalInfo.sex || '',
          state: profileInfo.personalInfo.state || '',
          city: profileInfo.personalInfo.city || '',
          country: profileInfo.personalInfo.country || '',
          description: profileInfo.personalInfo.description || ''
        });
      } catch (error) {
        console.error("Error fetching personal information:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: checked });
  };

  const handleSave = async (field) => {
    try {
      let method;
      switch (field) {
        case 'middleName':
          method = profileManagementContract.methods.updateMiddleName(personalInfo.middleName);
          break;
        case 'birthday':
          method = profileManagementContract.methods.updateBirthday(personalInfo.birthday);
          break;
        case 'makePublic':
          method = profileManagementContract.methods.updateMakePublic(personalInfo.makePublic);
          break;
        case 'sex':
          method = profileManagementContract.methods.updateSex(personalInfo.sex);
          break;
        case 'state':
          method = profileManagementContract.methods.updateState(personalInfo.state);
          break;
        case 'city':
          method = profileManagementContract.methods.updateCity(personalInfo.city);
          break;
        case 'country':
          method = profileManagementContract.methods.updateCountry(personalInfo.country);
          break;
        case 'description':
          method = profileManagementContract.methods.updateDescription(personalInfo.description);
          break;
        default:
          return;
      }
      await method.send({ from: account });

      alert('Personal information updated successfully');
    } catch (error) {
      console.error("Error updating personal information:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Personal Information</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Middle Name(s)</label>
              <input
                type="text"
                name="middleName"
                value={personalInfo.middleName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
              <button
                onClick={() => handleSave('middleName')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Middle Name
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Birthday</label>
              <input
                type="date"
                name="birthday"
                value={personalInfo.birthday}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
              <button
                onClick={() => handleSave('birthday')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Birthday
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Make Public</label>
              <input
                type="checkbox"
                name="makePublic"
                checked={personalInfo.makePublic}
                onChange={handleCheckboxChange}
                className="mt-1 block"
              />
              <button
                onClick={() => handleSave('makePublic')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Make Public
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Sex</label>
              <select
                name="sex"
                value={personalInfo.sex}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              >
                <option value="Not specified">Not specified</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <button
                onClick={() => handleSave('sex')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Sex
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={personalInfo.state}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
              <button
                onClick={() => handleSave('state')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save State
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={personalInfo.city}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
              <button
                onClick={() => handleSave('city')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save City
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={personalInfo.country}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
              <button
                onClick={() => handleSave('country')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Country
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={personalInfo.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
              <button
                onClick={() => handleSave('description')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Description
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PersonalInformation;
