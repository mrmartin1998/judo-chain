import web3 from './web3';
import JudokaRegistry from '../../../build/contracts/JudokaRegistry.json';
import VotingContract from '../../../build/contracts/VotingContract.json';

const judokaRegistryAddress = '0x1B849f0eCf7590432034b525FA49a3f42B60DA31';
const votingContractAddress = '0x12BF7EeE9d831366d2F3Ea3Ba368D88d05A9Bed9';

const judokaRegistryContract = new web3.eth.Contract(JudokaRegistry.abi, judokaRegistryAddress);
const votingContract = new web3.eth.Contract(VotingContract.abi, votingContractAddress);

export { judokaRegistryContract, votingContract };
