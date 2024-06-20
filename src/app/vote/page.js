"use client";

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { votingContract, judokaRegistryContract } from '../../utils/contract';
import web3 from '../../utils/web3';

export default function Vote() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestCount = await votingContract.methods.promotionRequestsCount().call();
        const requestPromises = [];
        for (let i = 0; i < requestCount; i++) {
          requestPromises.push(votingContract.methods.promotionRequests(i).call());
        }
        const requestsData = await Promise.all(requestPromises);
        setRequests(requestsData);
      } catch (error) {
        console.error('Error fetching promotion requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleVote = async (requestId) => {
    setVoting(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await votingContract.methods.voteForPromotion(requestId).send({ from: accounts[0] });
      alert('Vote cast successfully');
      // Refresh the requests
      const updatedRequests = await votingContract.methods.promotionRequests(requestId).call();
      setRequests(requests.map((req, index) => index === requestId ? updatedRequests : req));
    } catch (error) {
      console.error('Error casting vote:', error);
      alert('Failed to cast vote');
    } finally {
      setVoting(false);
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <header className="bg-white shadow-md mb-6">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Promotion Requests</h1>
          </div>
        </header>
        <div className="grid grid-cols-1 gap-4">
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-6">
                <p className="text-gray-700"><strong>Belt Level:</strong> {request.beltLevel}</p>
                <p className="text-gray-700"><strong>Promotion Date:</strong> {request.promotionDate}</p>
                <p className="text-gray-700"><strong>Gym:</strong> {request.gym}</p>
                <p className="text-gray-700"><strong>Points:</strong> {request.points}</p>
                <p className="text-gray-700"><strong>Verified:</strong> {request.verified ? 'Yes' : 'No'}</p>
                <button
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => handleVote(index)}
                  disabled={voting || request.verified}
                >
                  {voting ? 'Voting...' : 'Vote'}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No promotion requests available.</p>
          )}
        </div>
      </main>
    </div>
  );
}
