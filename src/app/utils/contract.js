import web3 from './web3';
import JudokaRegistry from '../../../build/contracts/JudokaRegistry.json';

const contractAddress = '0x628FE8603f7B874Ce38CA6F8B444733246411CFD';

const instance = new web3.eth.Contract(
    JudokaRegistry.abi, 
    contractAddress);

export default instance;