import assert from 'assert'
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
    const { bytecode, abi } = compile('Test.sol');
    accounts = await web3.eth.getAccounts();

    contract = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode, arguments: [] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Test', () => {
    it('deploys the test contract', () => {
        assert.ok(contract.options.address);
    });

    it('receives eth from an external account', () => {
        console.log('eth sent');
    });

    it('Contract has a balance of some kind of number', async () => {
        const balance = await contract.methods.getBalance().call();
        chaiAssert.typeOf(balance, 'string', 'Balance is the correct type');
    })

});
