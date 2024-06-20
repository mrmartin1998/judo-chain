import web3 from './web3';
import JudokaRegistry from '../../../build/contracts/JudokaRegistry.json';
import VotingContract from '../../../build/contracts/VotingContract.json';

const judokaRegistryAddress = '0x05D38c35CB1Cdd0b495BC82b35c77bB9c9e6a979';
const votingContractAddress = '0xd4Fdbe055f52466859a0aa6e5caD2c34B14bb9f4';

const judokaRegistryContract = new web3.eth.Contract(JudokaRegistry.abi, judokaRegistryAddress);
const votingContract = new web3.eth.Contract(VotingContract.abi, votingContractAddress);

export { judokaRegistryContract, votingContract };
