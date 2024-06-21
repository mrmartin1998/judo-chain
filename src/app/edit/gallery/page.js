'use client';

import { useEffect, useState } from 'react';
import web3 from '../../utils/web3';
import { judokaRegistryContract } from '../../utils/contract';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Gallery = () => {
  const [account, setAccount] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchGalleryInfo(accounts[0]);
      }
    };

    const fetchGalleryInfo = async (address) => {
      try {
        const data = await judokaRegistryContract.methods.getGallery(address).call();
        if (data) {
          setUploadedImages(data);
        }
      } catch (error) {
        console.error("Error fetching gallery information:", error);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description') {
      setDescription(value);
    } else if (name === 'file') {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      // Implement the logic to upload the image to your server or IPFS
      // Assume we get a URL back after uploading the image
      const imageUrl = 'https://path-to-uploaded-image';

      await judokaRegistryContract.methods.addImage(description, imageUrl).send({ from: account });
      alert('Image uploaded successfully');
      setUploadedImages([...uploadedImages, { description, url: imageUrl }]);
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert('Failed to upload image');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-black">Gallery</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Image</label>
              <input
                type="file"
                name="file"
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
            </div>
            <button
              onClick={handleUpload}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Upload
            </button>
            <h3 className="text-xl font-bold mt-6 text-black">Uploaded Images</h3>
            <ul className="mt-4 text-black">
              {uploadedImages.map((image, index) => (
                <li key={index} className="mb-4">
                  <p><strong>Description:</strong> {image.description}</p>
                  <img src={image.url} alt={image.description} className="w-full h-auto mt-2" />
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Gallery;
