import React, { useEffect, useState } from 'react';
import { messagingContract } from '../../utils/contract';
import web3 from '../../utils/web3';

const MessageList = ({ user }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const accounts = await web3.eth.getAccounts();
      const userMessages = await messagingContract.methods.getMessages(accounts[0]).call();
      setMessages(userMessages);
    };

    fetchMessages();
  }, []);

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          <p><strong>From:</strong> {msg.sender}</p>
          <p><strong>Message:</strong> {msg.content}</p>
          <p><strong>Time:</strong> {new Date(msg.timestamp * 1000).toLocaleString()}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default MessageList;
