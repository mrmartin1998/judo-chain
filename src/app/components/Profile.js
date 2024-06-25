'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { judokaRegistryContract, profileManagementContract, votingContract } from '../utils/contract';
import BigNumber from 'bignumber.js';

const Profile = ({ address }) => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    beltLevel: '',
    promotionDate: '',
    gym: '',
    state: '',
    city: '',
    country: '',
    description: ''
  });
  const [receivedVotePoints, setReceivedVotePoints] = useState(0);
  const [requiredPoints, setRequiredPoints] = useState(0);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const basicInfo = await judokaRegistryContract.methods.getJudoka(address).call();
        const profileInfo = await profileManagementContract.methods.profiles(address).call();

        if (basicInfo.promotions.length > 0) {
          const latestPromotion = basicInfo.promotions[basicInfo.promotions.length - 1];
          setProfileData({
            firstName: basicInfo.firstName,
            lastName: basicInfo.lastName,
            email: basicInfo.email,
            beltLevel: latestPromotion.beltLevel,
            promotionDate: latestPromotion.promotionDate,
            gym: latestPromotion.gym,
            state: profileInfo.personalInfo.state,
            city: profileInfo.personalInfo.city,
            country: profileInfo.personalInfo.country,
            description: profileInfo.personalInfo.description
          });

          const requiredPoints = await votingContract.methods.getRequiredPointsForBelt(latestPromotion.beltLevel).call();
          setRequiredPoints(new BigNumber(requiredPoints).toNumber());
        }

        const receivedVotePoints = await votingContract.methods.getReceivedVotePoints(address).call();
        setReceivedVotePoints(new BigNumber(receivedVotePoints).toNumber());

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
        <p className="text-gray-700"><strong>Email:</strong> {profileData.email}</p>
        <p className="text-gray-700"><strong>Belt Level:</strong> {profileData.beltLevel}</p>
        <p className="text-gray-700"><strong>Promotion Date:</strong> {profileData.promotionDate}</p>
        <p className="text-gray-700"><strong>Gym:</strong> {profileData.gym}</p>
        <p className="text-gray-700"><strong>State:</strong> {profileData.state}</p>
        <p className="text-gray-700"><strong>City:</strong> {profileData.city}</p>
        <p className="text-gray-700"><strong>Country:</strong> {profileData.country}</p>
        <p className="text-gray-700"><strong>Description:</strong> {profileData.description}</p>
        <div className="mt-4 w-full">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Verification Progress</h3>
          <p className="text-gray-700">{receivedVotePoints}/{requiredPoints} vote points</p>
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
