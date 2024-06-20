import web3 from './web3';
import JudokaRegistry from '../../../build/contracts/JudokaRegistry.json';
import VotingContract from '../../../build/contracts/VotingContract.json';

const judokaRegistryAddress = '0x8A5fA0751c9D9AC22aeb10bDA03a4D1464AE888C';
const votingContractAddress = '0xb8afE09A41cC016C08F08bE8D92f8ED9fBd7d00C';

const judokaRegistryContract = new web3.eth.Contract(JudokaRegistry.abi, judokaRegistryAddress);
const votingContract = new web3.eth.Contract(VotingContract.abi, votingContractAddress);

export { judokaRegistryContract, votingContract };
