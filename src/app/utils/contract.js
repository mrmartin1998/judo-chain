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
const coachRegistryAddress = '0x38CACc4139F163BB13e78Cc80819b001B7047F96';
const competitionRecordsAddress = '0xd6306795697a48EA2D710c3875EbB7368f7e2e7f';
const contentManagementAddress = '0x9006b356111597f17e3B4eF2890f420DA5ebC090';
const eventParticipationAddress = '0xb418834D1423551a74d09591A3d20eDCeD982418';
const forumContractAddress = '0x2512D3a34bcEfDDA545fae548939C98D08623349';
const injuryRegistryAddress = '0x583B1f7a9A7563Ab391AF3711D6B2884e61eC4Df';
const judokaRegistryAddress = '0xCEB955458DC93f5Eb9ee5AD13fB33dFADaBdc39d';
const messagingContractAddress = '0x33935322ab2DF5d9d3628FaFc110C450af2299a1';
const migrationsAddress = '0x5C788d70833b035fDc0cA3fab9C30d31cE0C844e';
const profileManagementAddress = '0xA3dcf4adc7b3B2C0B758bf7C91813764e67361Be';
const verificationAddress = '0xF55380D296E2d8b8eDb1Fbb5286989BCaFd1601F';
const votingContractAddress = '0x52bD90B41847Ec636C90F30D5E66bb0b31066998';

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
