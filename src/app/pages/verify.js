import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import web3 from '../utils/web3';
import contract from '../utils/contract';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });

export default function Verify() {
  const [account, setAccount] = useState('');
  const [judoka, setJudoka] = useState(null);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const judoka = await contract.methods.getJudoka(accounts[0]).call();
        setJudoka(judoka);
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Judo-Chain - Verify Registration</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white border-4 border-dashed border-gray-200 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Verify Registration</h2>
              {account ? (
                <div>
                  <p>Connected account: {account}</p>
                  {judoka ? (
                    <div>
                      <h3 className="text-xl font-bold mb-2">Judoka Information</h3>
                      <p>First Name: {judoka.firstName}</p>
                      <p>Last Name: {judoka.lastName}</p>
                      <p>Email: {judoka.email}</p>
                      <p>Belt Level: {judoka.beltLevel}</p>
                      <p>Registered: {judoka.isRegistered ? 'Yes' : 'No'}</p>
                    </div>
                  ) : (
                    <p>Loading judoka info
