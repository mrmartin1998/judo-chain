import web3 from './web3';
import JudokaRegistry from '../../../build/contracts/JudokaRegistry.json';
import VotingContract from '../../../build/contracts/VotingContract.json';
import ProfileManagement from '../../../build/contracts/ProfileManagement.json';
import ContentManagement from '../../../build/contracts/ContentManagement.json';
import CompetitionRecords from '../../../build/contracts/CompetitionRecords.json';
import Verification from '../../../build/contracts/Verification.json';
import EventParticipation from '../../../build/contracts/EventParticipation.json';
import CoachRegistry from '../../../build/contracts/CoachRegistry.json';
import InjuryRegistry from '../../../build/contracts/InjuryRegistry.json';
import ForumContract from '../../../build/contracts/ForumContract.json';
import MessagingContract from '../../../build/contracts/MessagingContract.json'; // New import

// Deployed contract addresses
const judokaRegistryAddress = '0x9304D1c9F56074240CDd7601A0d39048987a49C7';
const votingContractAddress = '0xC8d9F3701F7715568595BA9fDACc76D858b0b3EB';
const profileManagementAddress = '0xBaa4B76A9b790c4CB0b043785f20643F8cD9aa52';
const contentManagementAddress = '0x7c70327f013fDcE76b583408aFA03e51B2688c10';
const competitionRecordsAddress = '0x0BF8118d83D308AC7507FC59EdD3CE869A99C7a2';
const verificationAddress = '0x391a8b3d537587d0efb0c55353f5eFc09a8EFc52';
const eventParticipationAddress = '0xAc81657E1fD575Cb8c1FDE3Ca3A425dcad574FC8';
const coachRegistryAddress = '0x51492e249A3C3b6B3d5302948401F065Ae5d97B7';
const injuryRegistryAddress = '0xD49A41c19890246B21069435B2D96ec6a58D3322';
const forumContractAddress = '0x2512D3a34bcEfDDA545fae548939C98D08623349';
const messagingContractAddress = '0x5b562aCfCfF7E38ed5D6685f27e373150FBC3c77'; // New address

const judokaRegistryContract = new web3.eth.Contract(JudokaRegistry.abi, judokaRegistryAddress);
const votingContract = new web3.eth.Contract(VotingContract.abi, votingContractAddress);
const profileManagementContract = new web3.eth.Contract(ProfileManagement.abi, profileManagementAddress);
const contentManagementContract = new web3.eth.Contract(ContentManagement.abi, contentManagementAddress);
const competitionRecordsContract = new web3.eth.Contract(CompetitionRecords.abi, competitionRecordsAddress);
const verificationContract = new web3.eth.Contract(Verification.abi, verificationAddress);
const eventParticipationContract = new web3.eth.Contract(EventParticipation.abi, eventParticipationAddress);
const coachRegistryContract = new web3.eth.Contract(CoachRegistry.abi, coachRegistryAddress);
const injuryRegistryContract = new web3.eth.Contract(InjuryRegistry.abi, injuryRegistryAddress);
const forumContract = new web3.eth.Contract(ForumContract.abi, forumContractAddress);
const messagingContract = new web3.eth.Contract(MessagingContract.abi, messagingContractAddress); // New contract

export {
    judokaRegistryContract,
    votingContract,
    profileManagementContract,
    contentManagementContract,
    competitionRecordsContract,
    verificationContract,
    eventParticipationContract,
    coachRegistryContract,
    injuryRegistryContract,
    forumContract,
    messagingContract // Export new contract
};
