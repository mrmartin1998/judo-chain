import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import web3 from '../utils/web3';
import { useRouter } from 'next/router';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });

export default function Register() {
  const [account, setAccount] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        checkUserRegistration(accounts[0]);
      }

      window.ethereum.on('accountsChanged', function (accounts) {
        setAccount(accounts[0]);
        checkUserRegistration(accounts[0]);
      });
    };

    const checkUserRegistration = async (address) => {
      // Add logic to check if the user is registered
      const isRegistered = false; // Replace with actual check
      if (isRegistered) {
        router.push('/profile'); // Redirect to main dapp area
      }
    };

    if (window.ethereum) {
      loadAccount();
    }
  }, [router]);

  const handleConnectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      checkUserRegistration(accounts[0]);
    } catch (error) {
      console.error("User denied account access");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Judo-Chain - Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white border-4 border-dashed border-gray-200 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Register Profile</h2>
              {account ? (
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Current belt level
                    </label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                      <option>White belt</option>
                      <option>Blue belt</option>
                      <option>Purple belt</option>
                      <option>Brown belt</option>
                      <option>Black belt</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Register
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="text-lg mb-4 text-gray-600">Connect your MetaMask wallet to register.</p>
                  <button
                    onClick={handleConnectWallet}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Connect Wallet
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
