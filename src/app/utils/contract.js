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

// Deployed contract addresses
const judokaRegistryAddress = '0xFbEcc7D7c0b38283B755d41d2B11b360431F89A0';
const votingContractAddress = '0xF99c6290C643FAB7560feB2a4be729F6e8A2b9Ac';
const profileManagementAddress = '0xcAF8fFF3170bdd28B6e7C9c2C1249bb53743dD6D';
const contentManagementAddress = '0x9Abd817A28b31385241f12be6442e2E61aeF1bB1';
const competitionRecordsAddress = '0xb9B5e61f22780C4E847384d06861f3FB0A7757E3';
const verificationAddress = '0x1FDf6A50B927FF3dc97A3Cc431056D7a022418fc';
const eventParticipationAddress = '0x2d4F7699da15C7CcfdcCAA88c431a848891c4B99';
const coachRegistryAddress = '0x977f61724b8Dd4f670633a86A672abEB1E922e2E';
const injuryRegistryAddress = '0x7A29cDb80259910887380aeA3F3A9E76ECB6AB5d';
const forumContractAddress = '0x2512D3a34bcEfDDA545fae548939C98D08623349';

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
    forumContract
};
