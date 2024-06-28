
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
const coachRegistryAddress = '0x701973C479273Bbc6A21B9d28eD7100e0aA56A31';
const competitionRecordsAddress = '0x6950D2Da60eAb908AAd3739bd2fcb4D8136c2C07';
const contentManagementAddress = '0xBfA4FF7b8e5dB34F0Cdd393fE9eb1C9A12426Eb8';
const eventParticipationAddress = '0x2bc914aFAf60fE0Faf364f229963760a118f2B13';
const forumContractAddress = '0x2512D3a34bcEfDDA545fae548939C98D08623349';
const injuryRegistryAddress = '0xe6dD24049aEd59129c961F34BA09688612730622';
const judokaRegistryAddress = '0x694b1e63a857FC5D5049FEbF6D56EdbEdc4ca8d2';
const messagingContractAddress = '0xc72C092EB36395f3C88A362E105113eCE70543d3';
const migrationsAddress = '0x2CCf391b8bC58030b603d174D83cfD5ef7Ecb8E9';
const profileManagementAddress = '0x64A5c43Eebd8b80229980afDF65Bbae42797CFDE';
const verificationAddress = '0x3D6Bb31971087668D3F0081a29397755A7E84542';
const votingContractAddress = '0xe2bbeb5B40b5f0702CaD2499c63BAF0f36d39CD8';
const coachRegistryContract = new web3.eth.Contract(CoachRegistry.abi, coachRegistryAddress);
const competitionRecordsContract = new web3.eth.Contract(CompetitionRecords.abi, competitionRecordsAddress);
const contentManagementContract = new web3.eth.Contract(ContentManagement.abi, contentManagementAddress);
const eventParticipationContract = new web3.eth.Contract(EventParticipation.abi, eventParticipationAddress);
const forumContractContract = new web3.eth.Contract(ForumContract.abi, forumContractAddress);
const injuryRegistryContract = new web3.eth.Contract(InjuryRegistry.abi, injuryRegistryAddress);
const judokaRegistryContract = new web3.eth.Contract(JudokaRegistry.abi, judokaRegistryAddress);
const messagingContractContract = new web3.eth.Contract(MessagingContract.abi, messagingContractAddress);
const migrationsContract = new web3.eth.Contract(Migrations.abi, migrationsAddress);
const profileManagementContract = new web3.eth.Contract(ProfileManagement.abi, profileManagementAddress);
const verificationContract = new web3.eth.Contract(Verification.abi, verificationAddress);
const votingContractContract = new web3.eth.Contract(VotingContract.abi, votingContractAddress);

export {
    coachRegistryContract,
    competitionRecordsContract,
    contentManagementContract,
    eventParticipationContract,
    forumContractContract,
    injuryRegistryContract,
    judokaRegistryContract,
    messagingContractContract,
    migrationsContract,
    profileManagementContract,
    verificationContract,
    votingContractContract
};
