import web3 from './web3';
import JudokaRegistry from '../../../build/contracts/JudokaRegistry.json';
import VotingContract from '../../../build/contracts/VotingContract.json';
import ProfileManagement from '../../../build/contracts/ProfileManagement.json';
import ContentManagement from '../../../build/contracts/ContentManagement.json';
import CompetitionRecords from '../../../build/contracts/CompetitionRecords.json';
import Verification from '../../../build/contracts/Verification.json';
import EventParticipation from '../../../build/contracts/EventParticipation.json';

// Deployed contract addresses
const judokaRegistryAddress = '0x21F9bcA925D5A9D36179764E68dE6744a96a61e0';
const votingContractAddress = '0xDF371052667f03655Ab7CD2B1b4BFFd64eEB8Ac0';
const profileManagementAddress = '0xb3b0Ff677eeA2D2030dA258D9FE7f3B7B503b4d4';
const contentManagementAddress = '0xD9Cb7cdd26C38b6ee9724878991f3205c5705272';
const competitionRecordsAddress = '0x0e4D4277C4979B1E0CDBF4e7fc5E95A361247ca5';
const verificationAddress = '0x3c7F187B27d24cFf8268832345DA46D3c8903cAB';
const eventParticipationAddress = '0x31879318DBb8918Aa43d8ac51c2b028844D68896';

/*
JudokaRegistry: 0x21F9bcA925D5A9D36179764E68dE6744a96a61e0
VotingContract: 0xDF371052667f03655Ab7CD2B1b4BFFd64eEB8Ac0
ProfileManagement: 0xb3b0Ff677eeA2D2030dA258D9FE7f3B7B503b4d4
ContentManagement: 0xD9Cb7cdd26C38b6ee9724878991f3205c5705272
CompetitionRecords: 0x0e4D4277C4979B1E0CDBF4e7fc5E95A361247ca5
Verification: 0x3c7F187B27d24cFf8268832345DA46D3c8903cAB
EventParticipation: 0x31879318DBb8918Aa43d8ac51c2b028844D68896
*/

const judokaRegistryContract = new web3.eth.Contract(JudokaRegistry.abi, judokaRegistryAddress);
const votingContract = new web3.eth.Contract(VotingContract.abi, votingContractAddress);
const profileManagementContract = new web3.eth.Contract(ProfileManagement.abi, profileManagementAddress);
const contentManagementContract = new web3.eth.Contract(ContentManagement.abi, contentManagementAddress);
const competitionRecordsContract = new web3.eth.Contract(CompetitionRecords.abi, competitionRecordsAddress);
const verificationContract = new web3.eth.Contract(Verification.abi, verificationAddress);
const eventParticipationContract = new web3.eth.Contract(EventParticipation.abi, eventParticipationAddress);

export {
    judokaRegistryContract,
    votingContract,
    profileManagementContract,
    contentManagementContract,
    competitionRecordsContract,
    verificationContract,
    eventParticipationContract
};
