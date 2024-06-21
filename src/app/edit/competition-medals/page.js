'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import web3 from '../../utils/web3';
import { judokaRegistryContract } from '../../utils/contract'; // Correct import
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const CompetitionMedals = () => {
  const [account, setAccount] = useState('');
  const [medal, setMedal] = useState({
    event: '',
    location: '',
    division: '',
    result: 'Bronze',
    date: null,
    image: null
  });
  const [medals, setMedals] = useState([]);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchMedals(accounts[0]);
      }
    };

    const fetchMedals = async (address) => {
      try {
        const data = await judokaRegistryContract.methods.getMedals(address).call();
        if (data) {
          setMedals(data);
        }
      } catch (error) {
        console.error("Error fetching medals:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedal({ ...medal, [name]: value });
  };

  const handleDateChange = (date) => {
    setMedal({ ...medal, date });
  };

  const handleFileChange = (e) => {
    setMedal({ ...medal, image: e.target.files[0] });
  };

  const handleSaveMedal = async () => {
    try {
      // Placeholder for saving medal logic, e.g., uploading the image and saving data to the blockchain
      const formData = new FormData();
      formData.append('image', medal.image);
      formData.append('event', medal.event);
      formData.append('location', medal.location);
      formData.append('division', medal.division);
      formData.append('result', medal.result);
      formData.append('date', medal.date);

      await judokaRegistryContract.methods.addMedal(
        medal.event,
        medal.location,
        medal.division,
        medal.result,
        medal.date.toISOString().split('T')[0], // convert date to string
        'image_url_placeholder' // Placeholder for uploaded image URL
      ).send({ from: account });

      setMedals([...medals, medal]);
      setMedal({
        event: '',
        location: '',
        division: '',
        result: 'Bronze',
        date: null,
        image: null
      });

      alert('Medal added successfully');
    } catch (error) {
      console.error("Error adding medal:", error);
      alert('Failed to add medal');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Medals</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Event</label>
              <input
                type="text"
                name="event"
                value={medal.event}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={medal.location}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Division</label>
              <input
                type="text"
                name="division"
                value={medal.division}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Result</label>
              <select
                name="result"
                value={medal.result}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              >
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <DatePicker
                selected={medal.date}
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
              <label className="block text-sm font-medium text-gray-700">Add an image (Optional)</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <button
              onClick={handleSaveMedal}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save medal
            </button>
            <h3 className="text-xl font-bold mt-6 text-black">Medals List</h3>
            <table className="mt-4 w-full text-black">
              <thead>
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Event</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Division</th>
                  <th className="px-4 py-2">Result</th>
                  <th className="px-4 py-2">Image</th>
                </tr>
              </thead>
              <tbody>
                {medals.map((medal, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{medal.date}</td>
                    <td className="border px-4 py-2">{medal.event}</td>
                    <td className="border px-4 py-2">{medal.location}</td>
                    <td className="border px-4 py-2">{medal.division}</td>
                    <td className="border px-4 py-2">{medal.result}</td>
                    <td className="border px-4 py-2">{medal.image ? <img src={medal.image} alt="Medal" className="w-10 h-10" /> : 'No image'}</td>
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

export default CompetitionMedals;
