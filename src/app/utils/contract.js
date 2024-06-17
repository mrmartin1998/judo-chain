import web3 from './web3';
import JudokaRegistry from '../../../build/contracts/JudokaRegistry.json';

const contractAddress = '0x4d921fBedBD54aD11470Abec49Ce9D2685607FC8';

const instance = new web3.eth.Contract(
    JudokaRegistry.abi, 
    contractAddress);

export default instance;