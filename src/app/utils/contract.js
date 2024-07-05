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
const coachRegistryAddress = '0xa9aA3126d032C1fDAc7d4d0dFdAcACA14eeF4bb8';
const competitionRecordsAddress = '0x060F93494c491A602287e48779eBBfFEa12B8332';
const contentManagementAddress = '0xAe44fa5527b43033b097c692160A9E39bDEaf5C2';
const eventParticipationAddress = '0x44428ce08A1276b40b8272cb6d8A940CeAe60fF0';
const forumContractAddress = '0x51c021FB6Af613480C5A1afC31aaEC073F8f5965';
const injuryRegistryAddress = '0x0F8FEE52D4c3339Bf730B32196Bf484e84510041';
const judokaRegistryAddress = '0x239cB6edC2A80d3020a2b1f266aB6797Cca6ec71';
const messagingContractAddress = '0x7CDdfA7C98bc8b6E03f07e1322d84D73872F929B';
const migrationsAddress = '0x4f5a59354663520AAF7c896D83AE708B628e9D30';
const profileManagementAddress = '0x433D6D4222FcD7f34C0C2eEC5E2Ec0eDC18986f2';
const verificationAddress = '0x49c3b14922098580045Df4Fd6CE101F5Bd635faF';
const votingContractAddress = '0x413Cf9b2Bfc3D88DC3161B56995BE04DE85ee12F';

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
