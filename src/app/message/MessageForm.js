import React, { useState } from 'react';
import { messagingContract } from '../../utils/contract';
import web3 from '../../utils/web3';

const MessageForm = ({ receiver }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    const accounts = await web3.eth.getAccounts();
    await messagingContract.methods.sendMessage(receiver, message).send({ from: accounts[0] });
    setMessage('');
    alert('Message sent successfully!');
  };

  return (
    <div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default MessageForm;
