import web3 from './web3';
import CoachRegistry from '../../../build/contracts/CoachRegistry.json';
import CompetitionRecords from '../../../build/contracts/CompetitionRecords.json';
import ContentManagement from '../../../build/contracts/ContentManagement.json';
import EventParticipation from '../../../build/contracts/EventParticipation.json';
import ForumContract from '../../../build/contracts/ForumContract.json';
import InjuryRegistry from '../../../build/contracts/InjuryRegistry.json';
import JudokaRegistry from '../../../build/contracts/JudokaRegistry.json';
import MessagingContract from '../../../build/contracts/MessagingContract.json';
import Migrations from '../../../build/contracts/Migrations.json';
import ProfileManagement from '../../../build/contracts/ProfileManagement.json';
import Verification from '../../../build/contracts/Verification.json';
import VotingContract from '../../../build/contracts/VotingContract.json';

// Deployed contract addresses
const coachRegistryAddress = '0x388CCB627816Ed9EF19AF64b71fF0272071F345E';
const competitionRecordsAddress = '0x522Ed57839e2DC14191334Bc372956c4c76e94aa';
const contentManagementAddress = '0xA389c9ED44311657b9542485D9E1a289261fcEDc';
const eventParticipationAddress = '0x74EB9FD43b2D0d00D69C26370Aeefd9e9361c889';
const forumContractAddress = '0xB5196a2A34D67a6c27fC05919aC37AEe70ae9784';
const injuryRegistryAddress = '0xb21bF9eA2d833aAa1E6d61B7DFa0db68f35B9509';
const judokaRegistryAddress = '0x3472aF9b04725cF9c7A72A1634CAC731d791eD0c';
const messagingContractAddress = '0x01FfDefB3E33Fb88179b221f562b5e8748d7ae89';
const migrationsAddress = '0xc8A837d9dc84bdE2B511eA2F7f905B32A066922d';
const profileManagementAddress = '0xbD57f0088fBb305Cb0965753D6c3747843856A0c';
const verificationAddress = '0xaB04d3722A7472165cf563B8554BB6F364BF5C4b';
const votingContractAddress = '0x4A0005c8EA8E6Aa416abb8B9A864CF1318d3c83a';

const coachRegistryContract = new web3.eth.Contract(CoachRegistry.abi, coachRegistryAddress);
const competitionRecordsContract = new web3.eth.Contract(CompetitionRecords.abi, competitionRecordsAddress);
const contentManagementContract = new web3.eth.Contract(ContentManagement.abi, contentManagementAddress);
const eventParticipationContract = new web3.eth.Contract(EventParticipation.abi, eventParticipationAddress);
const forumContract = new web3.eth.Contract(ForumContract.abi, forumContractAddress);
const injuryRegistryContract = new web3.eth.Contract(InjuryRegistry.abi, injuryRegistryAddress);
const judokaRegistryContract = new web3.eth.Contract(JudokaRegistry.abi, judokaRegistryAddress);
const messagingContract = new web3.eth.Contract(MessagingContract.abi, messagingContractAddress);
const migrationsContract = new web3.eth.Contract(Migrations.abi, migrationsAddress);
const profileManagementContract = new web3.eth.Contract(ProfileManagement.abi, profileManagementAddress);
const verificationContract = new web3.eth.Contract(Verification.abi, verificationAddress);
const votingContract = new web3.eth.Contract(VotingContract.abi, votingContractAddress);

export {
    coachRegistryContract,
    competitionRecordsContract,
    contentManagementContract,
    eventParticipationContract,
    forumContract,
    injuryRegistryContract,
    judokaRegistryContract,
    messagingContract,
    migrationsContract,
    profileManagementContract,
    verificationContract,
    votingContract
};
