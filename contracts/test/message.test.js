import chai from 'chai'
import Ganache from 'ganache';
import Web3 from 'web3';
import { compile } from './util.js';

const chaiExpect = chai.expect;
const chaiAssert = chai.assert;

const web3 = new Web3(Ganache.provider());

let accounts;
let contract;

beforeEach(async () => {
    const { bytecode, abi } = compile('Message.sol');
    accounts = await web3.eth.getAccounts();

    contract = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode, arguments: [] })
        .send({ from: accounts[0], gas: '1000000' });
});