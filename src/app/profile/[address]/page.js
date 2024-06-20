"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Profile from '../../components/Profile';
import { judokaRegistryContract, votingContract } from '../../utils/contract';
import web3 from '../../utils/web3';

export default function ProfilePage() {
  const { address } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState([]);
  const [votePoints, setVotePoints] = useState(0);
  const [castingVote, setCastingVote] = useState(false);

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      try {
        console.log("Fetching profile data for address:", address);

        const data = await judokaRegistryContract.methods.getJudoka(address).call();
        console.log("Judoka data:", data);
        setProfileData(data);

        console.log("Available methods:", votingContract.methods);

        // Check and log all methods in the votingContract
        const contractMethods = Object.keys(votingContract.methods);
        console.log("Contract Methods:", contractMethods);

        // Check if the method exists and fetch data accordingly
        if (contractMethods.includes('getReceivedVotePoints')) {
          const points = await votingContract.methods.getReceivedVotePoints(address).call();
          console.log("Received vote points:", points);
          setVotePoints(points);
        } else {
          console.error("getReceivedVotePoints method not found in contract.");
        }

        if (contractMethods.includes('getVotesForUser')) {
          const voteList = await votingContract.methods.getVotesForUser(address).call();
          console.log("Vote list:", voteList);
          setVotes(voteList);
        } else {
          console.error("getVotesForUser method not found in contract.");
        }

      } catch (error) {
        console.error("Error fetching profile data:", error.message);
        console.error("Error stack trace:", error.stack);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [address]);

  const handleVote = async (isVerified) => {
    setCastingVote(true);
    try {
      const accounts = await web3.eth.getAccounts();
      console.log("Voting from account:", accounts[0]);

      await votingContract.methods.voteForUser(address, isVerified).send({ from: accounts[0] });
      alert('Vote cast successfully');

      const contractMethods = Object.keys(votingContract.methods);
      if (contractMethods.includes('getReceivedVotePoints')) {
        const points = await votingContract.methods.getReceivedVotePoints(address).call();
        console.log("Updated received vote points:", points);
        setVotePoints(points);
      } else {
        console.error("getReceivedVotePoints method not found in contract.");
      }

      if (contractMethods.includes('getVotesForUser')) {
        const voteList = await votingContract.methods.getVotesForUser(address).call();
        console.log("Updated vote list:", voteList);
        setVotes(voteList);
      } else {
        console.error("getVotesForUser method not found in contract.");
      }
    } catch (error) {
      console.error('Error casting vote:', error.message);
      console.error('Error stack trace:', error.stack);
      alert('Failed to cast vote');
    } finally {
      setCastingVote(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Profile data not found</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <header className="bg-white shadow-md mb-6">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile of {profileData.firstName} {profileData.lastName}</h1>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Profile address={address} />

          <div className="col-span-2 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Wall</h2>
            <div>
              <textarea className="w-full p-2 mb-4 border rounded" placeholder="Leave a message..." />
              <button className="bg-blue-500 text-white py-2 px-4 rounded">Post</button>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 bg-white shadow rounded-lg p-6 mt-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Promotion History</h2>
            <ul className="list-none text-gray-700">
              {profileData.promotions.length > 0 ? profileData.promotions.map((promotion, index) => (
                <li key={index} className="mb-2">
                  <p><strong>Belt Level:</strong> {promotion.beltLevel}</p>
                  <p><strong>Promotion Date:</strong> {promotion.promotionDate}</p>
                  <p><strong>Gym:</strong> {promotion.gym}</p>
                </li>
              )) : (
                <p className="text-gray-700">No promotion history available.</p>
              )}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3 bg-white shadow rounded-lg p-6 mt-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Votes Received for Current Rank</h2>
            <ul className="list-none text-gray-700">
              {votes.length > 0 ? votes.map((vote, index) => (
                <li key={index} className="mb-2">
                  <p><strong>Voter:</strong> {vote.voter}</p>
                  <p><strong>Verification Status:</strong> {vote.isVerified ? 'Yes' : 'No'}</p>
                </li>
              )) : (
                <p className="text-gray-700">No votes received for current rank.</p>
              )}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3 bg-white shadow rounded-lg p-6 mt-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Verify Rank</h2>
            <div>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                onClick={() => handleVote(true)}
                disabled={castingVote}
              >
                {castingVote ? 'Voting...' : 'Yes (+ points)'}
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => handleVote(false)}
                disabled={castingVote}
              >
                {castingVote ? 'Voting...' : 'No (- points)'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
