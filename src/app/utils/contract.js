import web3 from './web3';
import JudokaRegistry from '../../../build/contracts/JudokaRegistry.json';

const contractAddress = '0x287f287E19e7B56d471cBBdeeb1B05565Dd3210a';

const instance = new web3.eth.Contract(
    JudokaRegistry.abi, 
    contractAddress);

export default instance;