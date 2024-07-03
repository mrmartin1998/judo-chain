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
const coachRegistryAddress = '0xad988440b3FB01486bDe193bc5bA192FEEF983EB';
const competitionRecordsAddress = '0x9B0ef3143279bfD7728B5895b3d96407b831d699';
const contentManagementAddress = '0x1938d113E45c409657652E4ef51535dE75847f83';
const eventParticipationAddress = '0x327Ee2f6458A40889BAb83e4BeC00bc3eD44C23E';
const forumContractAddress = '0x98CaBED3Ec743cE53F3D357D921049b4363871F1';
const injuryRegistryAddress = '0x1d3E0eA3F1C75621086bfeB69E032D67f369a582';
const judokaRegistryAddress = '0x8CA1dB236B6FFf7b71F65e506695606B5c66aEc2';
const messagingContractAddress = '0x3BF607e1AED8fB460ED2D91C6a0Ba78beaF0648e';
const migrationsAddress = '0xd0E9fa035595C4169BaD0B87482B74cDf4EE69C6';
const profileManagementAddress = '0xD63bbD9F83045d872BC6BAc575129A87c3CB3c1c';
const verificationAddress = '0x7D2C3dcf42fac72507cc80Eec6258C013c87fDdd';
const votingContractAddress = '0xBea8cE8953DA81FeBc788E697BD9Fb83d6B56dbb';

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
