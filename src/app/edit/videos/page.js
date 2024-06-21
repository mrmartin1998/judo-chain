'use client';

import { useEffect, useState } from 'react';
import web3 from '../../utils/web3';
import { judokaRegistryContract } from '../../utils/contract';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Videos = () => {
  const [account, setAccount] = useState('');
  const [videoInfo, setVideoInfo] = useState({
    title: '',
    youtubeLink: ''
  });
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchVideoInfo(accounts[0]);
      }
    };

    const fetchVideoInfo = async (address) => {
      try {
        const data = await judokaRegistryContract.methods.getVideos(address).call();
        if (data) {
          setVideos(data);
        }
      } catch (error) {
        console.error("Error fetching video information:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoInfo({ ...videoInfo, [name]: value });
  };

  const handleSave = async () => {
    try {
      const youtubeID = videoInfo.youtubeLink.split('v=')[1];
      await judokaRegistryContract.methods.addVideo(videoInfo.title, youtubeID).send({ from: account });
      alert('Video saved successfully');
      setVideos([...videos, { title: videoInfo.title, youtubeID }]);
      setVideoInfo({ title: '', youtubeLink: '' });
    } catch (error) {
      console.error("Error saving video:", error);
      alert('Failed to save video');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Videos</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={videoInfo.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
              <input
                type="text"
                name="youtubeLink"
                value={videoInfo.youtubeLink}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Video
            </button>
            <h3 className="text-xl font-bold mt-6 text-black">Videos</h3>
            <ul className="mt-4 text-black">
              {videos.map((video, index) => (
                <li key={index} className="mb-4">
                  <p><strong>Title:</strong> {video.title}</p>
                  <p><strong>YouTube ID:</strong> {video.youtubeID}</p>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Videos;
