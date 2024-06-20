'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { judokaRegistryContract, votingContract } from '../utils/contract';
import { BigNumber } from 'bignumber.js';

const Profile = ({ address }) => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    beltLevel: '',
    promotionDate: '',
    gym: ''
  });
  const [votePoints, setVotePoints] = useState(0);
  const [requiredPoints, setRequiredPoints] = useState(0);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch profile data from JudokaRegistry contract
        const data = await judokaRegistryContract.methods.getJudoka(address).call();
        if (data.promotions.length > 0) {
          const latestPromotion = data.promotions[data.promotions.length - 1];
          setProfileData({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            beltLevel: latestPromotion.beltLevel,
            promotionDate: latestPromotion.promotionDate,
            gym: latestPromotion.gym
          });

          // Fetch required points for the current belt level from VotingContract
          const requiredPoints = await votingContract.methods.getRequiredPointsForBelt(latestPromotion.beltLevel).call();
          setRequiredPoints(new BigNumber(requiredPoints).toNumber());
        }

        // Fetch user's current vote points from VotingContract
        const userVotePoints = await votingContract.methods.getUserVotePoints(address).call();
        setVotePoints(new BigNumber(userVotePoints).toNumber());

      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (address) {
      fetchProfileData();
    }
  }, [address]);

  return (
    <div className="bg-white shadow rounded-lg p-6 text-center">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
        <p className="text-xl font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</p>
        <p className="text-gray-700"><strong>Belt Level:</strong> {profileData.beltLevel}</p>
        <div className="mt-4 w-full">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Verification Progress</h3>
          <p className="text-gray-700">{votePoints}/{requiredPoints} vote points</p>
        </div>
        <div className="mt-4 flex flex-col space-y-2 w-full">
          <Link href="/training-history" legacyBehavior>
            <a className="bg-blue-500 text-white py-2 px-4 rounded">View training history</a>
          </Link>
          <Link href={`/profile`} legacyBehavior>
            <a className="bg-green-500 text-white py-2 px-4 rounded">View full profile</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
