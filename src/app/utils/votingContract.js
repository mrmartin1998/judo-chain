import web3 from './web3';
import VotingContract from '../../../build/contracts/VotingContract.json';

const contractAddress = '0x3BAa25F8B53e7c4fFd8cfBDfE368A669224fb8ca';

const instance = new web3.eth.Contract(
    VotingContract.abi, 
    contractAddress
);

export default instance;
