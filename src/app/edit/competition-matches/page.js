'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import web3 from '../../utils/web3';
import { judokaRegistryContract } from '../../utils/contract'; // Correct import
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const CompetitionMatches = () => {
  const [account, setAccount] = useState('');
  const [match, setMatch] = useState({
    event: '',
    location: '',
    division: '',
    opponent: '',
    result: 'Loss',
    method: '',
    youtubeId: '',
    date: null
  });
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchMatches(accounts[0]);
      }
    };

    const fetchMatches = async (address) => {
      try {
        const data = await judokaRegistryContract.methods.getMatches(address).call();
        if (data) {
          setMatches(data);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMatch({ ...match, [name]: value });
  };

  const handleDateChange = (date) => {
    setMatch({ ...match, date });
  };

  const handleSaveMatch = async () => {
    try {
      await judokaRegistryContract.methods.addMatch(
        match.event,
        match.location,
        match.division,
        match.opponent,
        match.result,
        match.method,
        match.youtubeId,
        match.date.toISOString().split('T')[0] // convert date to string
      ).send({ from: account });

      setMatches([...matches, match]);
      setMatch({
        event: '',
        location: '',
        division: '',
        opponent: '',
        result: 'Loss',
        method: '',
        youtubeId: '',
        date: null
      });

      alert('Match added successfully');
    } catch (error) {
      console.error("Error adding match:", error);
      alert('Failed to add match');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Matches</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Event</label>
              <input
                type="text"
                name="event"
                value={match.event}
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
                value={match.location}
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
                value={match.division}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Opponent</label>
              <input
                type="text"
                name="opponent"
                value={match.opponent}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Result</label>
              <select
                name="result"
                value={match.result}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              >
                <option value="Win">Win</option>
                <option value="Loss">Loss</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Method</label>
              <input
                type="text"
                name="method"
                value={match.method}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">YouTube ID</label>
              <input
                type="text"
                name="youtubeId"
                value={match.youtubeId}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
              <img src="/path/to/youtube_id_example.png" alt="YouTube ID example" className="mt-2" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <DatePicker
                selected={match.date}
                onChange={handleDateChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                dateFormat="yyyy-MM-dd"
                popperClassName="react-datepicker-popper"
                calendarClassName="react-datepicker"
                dayClassName={() => "hover:bg-gray-200"}
                customInput={<input type="text" style={{ color: 'black', backgroundColor: 'white' }} />}
              />
            </div>
            <button
              onClick={handleSaveMatch}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save match
            </button>
            <h3 className="text-xl font-bold mt-6 text-black">Matches List</h3>
            <table className="mt-4 w-full text-black">
              <thead>
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Event</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Division</th>
                  <th className="px-4 py-2">Opponent</th>
                  <th className="px-4 py-2">Result</th>
                  <th className="px-4 py-2">Method</th>
                  <th className="px-4 py-2">YouTube</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{match.date}</td>
                    <td className="border px-4 py-2">{match.event}</td>
                    <td className="border px-4 py-2">{match.location}</td>
                    <td className="border px-4 py-2">{match.division}</td>
                    <td className="border px-4 py-2">{match.opponent}</td>
                    <td className="border px-4 py-2">{match.result}</td>
                    <td className="border px-4 py-2">{match.method}</td>
                    <td className="border px-4 py-2">
                      {match.youtubeId ? (
                        <a href={`https://www.youtube.com/watch?v=${match.youtubeId}`} target="_blank" rel="noopener noreferrer">
                          Watch
                        </a>
                      ) : (
                        'No video'
                      )}
                    </td>
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

export default CompetitionMatches;
