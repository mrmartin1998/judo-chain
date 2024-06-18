import web3 from './web3';
import JudokaRegistry from '../../../build/contracts/JudokaRegistry.json';

const contractAddress = '0xA5b6eEd4715a42eD68312E2aeEc671154b6577F1';

const instance = new web3.eth.Contract(
    JudokaRegistry.abi, 
    contractAddress);

export default instance;