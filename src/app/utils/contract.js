import web3 from './web3';
import JudokaRegistry from '../../../build/contracts/JudokaRegistry.json';
import VotingContract from '../../../build/contracts/VotingContract.json';
import ProfileManagement from '../../../build/contracts/ProfileManagement.json';
import ContentManagement from '../../../build/contracts/ContentManagement.json';
import CompetitionRecords from '../../../build/contracts/CompetitionRecords.json';
import Verification from '../../../build/contracts/Verification.json';
import EventParticipation from '../../../build/contracts/EventParticipation.json';
import CoachRegistry from '../../../build/contracts/CoachRegistry.json';

const judokaRegistryAddress = '0x766b8fD16d38Aa0e1aFB353281F6a29c9C7d3014';
const votingContractAddress = '0x7aAd4737A6109cd27985B041d4f945d0eF943f03';
const profileManagementAddress = '0x0Cf06C423Be3e3AD741dF7A5354d6570e26A9C3E';
const contentManagementAddress = '0x89ADafCcfDafD4E65bC9cA9248E5087F971FdA45';
const competitionRecordsAddress = '0xe65d38fF3186F37e566123fDEe6E5d72B9b70dB5';
const verificationAddress = '0x997605ef8200e74Ed4ddc45dB34dEfe9B48c82a2';
const eventParticipationAddress = '0xA764b4b88f8b8eC0336E5fb3F26f21f1Aa7b2baF';
const coachRegistryAddress = '0xC9Ae9eaed240acacCFEDC981551B37d0D7957e37';

/*
JudokaRegistry: 0x766b8fD16d38Aa0e1aFB353281F6a29c9C7d3014
VotingContract: 0x7aAd4737A6109cd27985B041d4f945d0eF943f03
ProfileManagement: 0x0Cf06C423Be3e3AD741dF7A5354d6570e26A9C3E
ContentManagement: 0x89ADafCcfDafD4E65bC9cA9248E5087F971FdA45
CompetitionRecords: 0xe65d38fF3186F37e566123fDEe6E5d72B9b70dB5
Verification: 0x997605ef8200e74Ed4ddc45dB34dEfe9B48c82a2
EventParticipation: 0xA764b4b88f8b8eC0336E5fb3F26f21f1Aa7b2baF
CoachRegistry: 0xC9Ae9eaed240acacCFEDC981551B37d0D7957e37
*/

const judokaRegistryContract = new web3.eth.Contract(JudokaRegistry.abi, judokaRegistryAddress);
const votingContract = new web3.eth.Contract(VotingContract.abi, votingContractAddress);
const profileManagementContract = new web3.eth.Contract(ProfileManagement.abi, profileManagementAddress);
const contentManagementContract = new web3.eth.Contract(ContentManagement.abi, contentManagementAddress);
const competitionRecordsContract = new web3.eth.Contract(CompetitionRecords.abi, competitionRecordsAddress);
const verificationContract = new web3.eth.Contract(Verification.abi, verificationAddress);
const eventParticipationContract = new web3.eth.Contract(EventParticipation.abi, eventParticipationAddress);
const coachRegistryContract = new web3.eth.Contract(CoachRegistry.abi, coachRegistryAddress); 

export {
    judokaRegistryContract,
    votingContract,
    profileManagementContract,
    contentManagementContract,
    competitionRecordsContract,
    verificationContract,
    eventParticipationContract,
    coachRegistryContract
};
