"use client";

import React, { useEffect, useState } from 'react';
import web3 from '../utils/web3';
import { messagingContract, judokaRegistryContract } from '../utils/contract';
import Navbar from '../components/Navbar';

const Messaging = () => {
  const [account, setAccount] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [judokas, setJudokas] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        fetchMessages(accounts[0]);
        fetchFriendRequests(accounts[0]);
      }
    };

    const fetchMessages = async (address) => {
      const messageIds = await messagingContract.methods.getUserMessages(address).call();
      const messageArray = [];
      for (let i = 0; i < messageIds.length; i++) {
        const message = await messagingContract.methods.getMessage(messageIds[i]).call();
        const sender = await judokaRegistryContract.methods.getJudoka(message.sender).call();
        const receiver = await judokaRegistryContract.methods.getJudoka(message.receiver).call();
        messageArray.push({
          ...message,
          senderName: `${sender.firstName} ${sender.lastName}`,
          receiverName: `${receiver.firstName} ${receiver.lastName}`
        });
      }
      setMessages(messageArray);
    };

    const fetchFriendRequests = async (address) => {
      const requestIds = await messagingContract.methods.getUserFriendRequests(address).call();
      const requestArray = [];
      for (let i = 0; i < requestIds.length; i++) {
        const request = await messagingContract.methods.getFriendRequest(requestIds[i]).call();
        const requester = await judokaRegistryContract.methods.getJudoka(request.requester).call();
        requestArray.push({
          ...request,
          requesterName: `${requester.firstName} ${requester.lastName}`,
        });
      }
      setFriendRequests(requestArray);
    };

    const fetchJudokas = async () => {
      const userAddresses = await judokaRegistryContract.methods.getAllJudokas().call();
      const users = await Promise.all(
        userAddresses.map(async (address) => {
          const user = await judokaRegistryContract.methods.getJudoka(address).call();
          return {
            address,
            name: `${user.firstName} ${user.lastName}`,
          };
        })
      );
      setJudokas(users);
    };

    if (window.ethereum) {
      loadAccount();
      fetchJudokas();
    }
  }, []);

  const sendMessage = async () => {
    const accounts = await web3.eth.getAccounts();
    await messagingContract.methods.sendMessage(recipient, content).send({ from: accounts[0] });
    setContent('');
    fetchMessages(accounts[0]);
  };

  const acceptFriendRequest = async (requestId) => {
    await messagingContract.methods.acceptFriendRequest(requestId).send({ from: account });
    fetchFriendRequests(account);
    alert('Friend request accepted');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex-grow">
        <div className="bg-white p-8 shadow rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-black">Messaging</h1>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-black">Send a Message</h2>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-4"
              style={{ color: 'black', backgroundColor: 'white' }}
            >
              <option value="">Select Recipient</option>
              {judokas.map((judoka, index) => (
                <option key={index} value={judoka.address}>
                  {judoka.name}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Message Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full h-24 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              style={{ color: 'black', backgroundColor: 'white' }}
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Send
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Messages</h2>
            {messages.map((message, index) => (
              <div key={index} className="mb-6">
                <div className="bg-gray-200 p-6 rounded shadow">
                  <p className="text-black mb-4">{message.content}</p>
                  <p className="text-sm text-gray-600 mb-2">From: {message.senderName} ({message.sender})</p>
                  <p className="text-sm text-gray-600">To: {message.receiverName} ({message.receiver})</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Friend Requests</h2>
            {friendRequests.map((request, index) => (
              <div key={index} className="mb-6">
                <div className="bg-gray-200 p-6 rounded shadow">
                  <p className="text-black mb-4">Friend request from {request.requesterName}</p>
                  <button
                    onClick={() => acceptFriendRequest(request.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messaging;
