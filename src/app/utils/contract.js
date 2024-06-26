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

// Deployed contract addresses
const judokaRegistryAddress = '0x09F5DaF85BaE519ee714B98a99d54895C38E8A10';
const votingContractAddress = '0x7DD27366b2C497dC847C489168a690588A7A2081';
const profileManagementAddress = '0x53B4119cbCa21F484Ed0B879584CCaAC343e6cb5';
const contentManagementAddress = '0x13a56A9E1285226CceBd75F59b025ba19942432c';
const competitionRecordsAddress = '0xff8f80F502ebe9Fd38A9502BAf3AC04E8F5d5438';
const verificationAddress = '0xE14888d800e9C970124e8E7c68Ee8003213Ad70e';
const eventParticipationAddress = '0x9022A82467E02c50Aa2541d4013795976703B33f';
const coachRegistryAddress = '0xd1a7733385F904241550CcdE1535e32eC097d723';
const injuryRegistryAddress = '0xBE5368522Fc17B7cAAB6dB5A5fF2B20bef53Edf2';

const judokaRegistryContract = new web3.eth.Contract(JudokaRegistry.abi, judokaRegistryAddress);
const votingContract = new web3.eth.Contract(VotingContract.abi, votingContractAddress);
const profileManagementContract = new web3.eth.Contract(ProfileManagement.abi, profileManagementAddress);
const contentManagementContract = new web3.eth.Contract(ContentManagement.abi, contentManagementAddress);
const competitionRecordsContract = new web3.eth.Contract(CompetitionRecords.abi, competitionRecordsAddress);
const verificationContract = new web3.eth.Contract(Verification.abi, verificationAddress);
const eventParticipationContract = new web3.eth.Contract(EventParticipation.abi, eventParticipationAddress);
const coachRegistryContract = new web3.eth.Contract(CoachRegistry.abi, coachRegistryAddress);
const injuryRegistryContract = new web3.eth.Contract(InjuryRegistry.abi, injuryRegistryAddress);

export {
    judokaRegistryContract,
    votingContract,
    profileManagementContract,
    contentManagementContract,
    competitionRecordsContract,
    verificationContract,
    eventParticipationContract,
    coachRegistryContract,
    injuryRegistryContract
};
