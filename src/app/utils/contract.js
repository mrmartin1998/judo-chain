import web3 from './web3';
import JudokaRegistry from '../../../build/contracts/JudokaRegistry.json';

const contractAddress = '0xE6E95314052BaA348358F0ecB4E1D58a2A8b636b';

const instance = new web3.eth.Contract(
    JudokaRegistry.abi, 
    contractAddress);

export default instance;