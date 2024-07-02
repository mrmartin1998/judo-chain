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
  const [friends, setFriends] = useState([]);

  const fetchMessages = async (address) => {
    try {
      const messageIds = await messagingContract.methods.getUserMessages(address).call();
      const messageArray = [];
      for (let i = 0; i < messageIds.length; i++) {
        const message = await messagingContract.methods.getMessage(messageIds[i]).call();
        if (message) {
          const sender = await judokaRegistryContract.methods.getJudoka(message[0]).call();
          const receiver = await judokaRegistryContract.methods.getJudoka(message[1]).call();
          messageArray.push({
            sender: message[0],
            receiver: message[1],
            content: message[2],
            senderName: `${sender.firstName} ${sender.lastName}`,
            receiverName: `${receiver.firstName} ${receiver.lastName}`
          });
        }
      }
      setMessages(messageArray);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      console.error("Error stack trace:", error.stack);
    }
  };

  const fetchFriendRequests = async (address) => {
    try {
      const requestIds = await messagingContract.methods.getUserFriendRequests(address).call();
      const requestArray = [];
      for (let i = 0; i < requestIds.length; i++) {
        const request = await messagingContract.methods.getFriendRequest(requestIds[i]).call();
        const requesterAddress = request[0];
        if (web3.utils.isAddress(requesterAddress)) {
          const requester = await judokaRegistryContract.methods.getJudoka(requesterAddress).call();
          requestArray.push({
            ...request,
            requesterName: `${requester.firstName} ${requester.lastName}`,
            requester: requesterAddress,
            requestId: requestIds[i]  // Adding requestId to be used in acceptFriendRequest
          });
        } else {
          console.error("Invalid requester address:", requesterAddress);
        }
      }
      setFriendRequests(requestArray);
    } catch (error) {
      console.error("Error fetching friend requests:", error.message);
      console.error("Error stack trace:", error.stack);
    }
  };

  const fetchJudokas = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching judokas:", error.message);
      console.error("Error stack trace:", error.stack);
    }
  };

  const fetchFriends = async (address) => {
    try {
      const friendAddresses = await messagingContract.methods.getUserFriends(address).call();
      const friendArray = await Promise.all(
        friendAddresses.map(async (friendAddress) => {
          const friend = await judokaRegistryContract.methods.getJudoka(friendAddress).call();
          return {
            address: friendAddress,
            name: `${friend.firstName} ${friend.lastName}`,
          };
        })
      );
      setFriends(friendArray);
    } catch (error) {
      console.error("Error fetching friends:", error.message);
      console.error("Error stack trace:", error.stack);
    }
  };

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await fetchMessages(accounts[0]);
          await fetchFriendRequests(accounts[0]);
          await fetchFriends(accounts[0]);
        }
      } catch (error) {
        console.error("Error loading account:", error.message);
        console.error("Error stack trace:", error.stack);
      }
    };

    if (window.ethereum) {
      loadAccount();
      fetchJudokas();
    }
  }, []);

  const sendMessage = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await messagingContract.methods.sendMessage(recipient, content).send({ from: accounts[0] });
      setContent('');
      await fetchMessages(accounts[0]);
    } catch (error) {
      console.error("Error sending message:", error.message);
      console.error("Error stack trace:", error.stack);
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      console.log("Accepting friend request with ID:", requestId);  // Log requestId to ensure it's correct
      await messagingContract.methods.acceptFriendRequest(requestId).send({ from: account });
      await fetchFriendRequests(account);  // Ensure the function is called correctly
      await fetchFriends(account);  // Refresh the friends list
      alert('Friend request accepted');
    } catch (error) {
      console.error("Error accepting friend request:", error.message);
      console.error("Error stack trace:", error.stack);
    }
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
              {friends.map((friend, index) => (
                <option key={index} value={friend.address}>
                  {friend.name}
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
                  <p className="text-black mb-4">From: {request.requesterName} ({request.requester})</p>
                  <button
                    onClick={() => acceptFriendRequest(request.requestId)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Friends</h2>
            {friends.map((friend, index) => (
              <div key={index} className="mb-6">
                <div className="bg-gray-200 p-6 rounded shadow">
                  <p className="text-black mb-4">{friend.name}</p>
                  <p className="text-sm text-gray-600 mb-2">{friend.address}</p>
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
