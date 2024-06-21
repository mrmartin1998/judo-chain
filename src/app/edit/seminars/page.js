'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import web3 from '../../utils/web3';
import { judokaRegistryContract } from '../../utils/contract'; // Correct import
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Seminars = () => {
  const [account, setAccount] = useState('');
  const [eventInfo, setEventInfo] = useState({
    event: '',
    location: '',
    date: null,
    image: ''
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchEventInfo(accounts[0]);
      }
    };

    const fetchEventInfo = async (address) => {
      try {
        const data = await judokaRegistryContract.methods.getSeminars(address).call();
        if (data) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching event information:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventInfo({ ...eventInfo, [name]: value });
  };

  const handleDateChange = (date) => {
    setEventInfo({ ...eventInfo, date });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEventInfo({ ...eventInfo, image: file });
  };

  const handleSave = async () => {
    try {
      // Implement file upload logic and get the file URL
      const fileURL = await uploadFile(eventInfo.image);

      await judokaRegistryContract.methods.addSeminar(
        eventInfo.event,
        eventInfo.location,
        eventInfo.date ? eventInfo.date.toISOString().split('T')[0] : '', // convert date to string
        fileURL
      ).send({ from: account });

      alert('Event saved successfully');
      setEvents([...events, {
        event: eventInfo.event,
        location: eventInfo.location,
        date: eventInfo.date ? eventInfo.date.toISOString().split('T')[0] : '',
        image: fileURL
      }]);
      setEventInfo({ event: '', location: '', date: null, image: '' });
    } catch (error) {
      console.error("Error saving event:", error);
      alert('Failed to save event');
    }
  };

  const uploadFile = async (file) => {
    if (!file) return '';
    // Implement the actual file upload logic here and return the file URL
    return URL.createObjectURL(file); // Temporary URL for demonstration
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Seminars, Camps & Workshops Attended</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Event</label>
              <input
                type="text"
                name="event"
                value={eventInfo.event}
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
                value={eventInfo.location}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <DatePicker
                selected={eventInfo.date}
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
              <label className="block text-sm font-medium text-gray-700">Add an Image (Optional)</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="mt-1 block w-full text-gray-900"
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Event
            </button>
            <h3 className="text-xl font-bold mt-6 text-black">Events</h3>
            <ul className="mt-4 text-black">
              {events.map((event, index) => (
                <li key={index} className="mb-4">
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Event:</strong> {event.event}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  {event.image && <p><strong>Image:</strong> <img src={event.image} alt="Event" width="100" /></p>}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Seminars;
