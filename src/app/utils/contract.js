import web3 from './web3';
import JudokaRegistry from '../../../build/contracts/JudokaRegistry.json';
import VotingContract from '../../../build/contracts/VotingContract.json';
import ProfileManagement from '../../../build/contracts/ProfileManagement.json';
import ContentManagement from '../../../build/contracts/ContentManagement.json';
import CompetitionRecords from '../../../build/contracts/CompetitionRecords.json';
import Verification from '../../../build/contracts/Verification.json';
import EventParticipation from '../../../build/contracts/EventParticipation.json';
import CoachRegistry from '../../../build/contracts/CoachRegistry.json';

// Deployed contract addresses
const judokaRegistryAddress = '0x29FaDCf7B417Ae51056FC6bcf421E36BCE2C8175';
const votingContractAddress = '0x48ec6d7e9507F6cb93faED873909991742D61E54';
const profileManagementAddress = '0x621B283305a89978b10E621102Ac3ed436D50DE7';
const contentManagementAddress = '0x35889C8fE6bb35aA27255cE9A7d2B31Be285732C';
const competitionRecordsAddress = '0x4740EaeCb75Ce34716d07b4442Ae09a95F3d7733';
const verificationAddress = '0xB96D8772046FD988f4CF925BF6cf25F0d98C08C1';
const eventParticipationAddress = '0xA43EaD38F384a35b6001E49daBB1067aC148894a';
const coachRegistryAddress = '0x855E83d268962F4860CFDC6213e4D31A7d651fD7';

/*
JudokaRegistry: 0x29FaDCf7B417Ae51056FC6bcf421E36BCE2C8175
VotingContract: 0x48ec6d7e9507F6cb93faED873909991742D61E54
ProfileManagement: 0x621B283305a89978b10E621102Ac3ed436D50DE7
ContentManagement: 0x35889C8fE6bb35aA27255cE9A7d2B31Be285732C
CompetitionRecords: 0x4740EaeCb75Ce34716d07b4442Ae09a95F3d7733
Verification: 0xB96D8772046FD988f4CF925BF6cf25F0d98C08C1
EventParticipation: 0xA43EaD38F384a35b6001E49daBB1067aC148894a
CoachRegistry: 0x855E83d268962F4860CFDC6213e4D31A7d651fD7
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
