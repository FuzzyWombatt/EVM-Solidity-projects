import chai from 'chai';
import Ganache from 'ganache';
import Web3 from 'web3';
import { compile } from './util.js';

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

describe('Tests for Test.sol contract', () => {
    it('Deploys the Test contract', () => {
        chaiAssert.isOk(
            contract.options.address,
            'Contract has an address, is deployed',
        );
    });

    it('Tests getBalance() function and returns apropriate balance of 0 when instanced', async () => {
        const balance = parseInt(await contract.methods.getBalance().call());
        chaiAssert.typeOf(balance, 'number', 'Balance is not the correct type');
        chaiAssert.equal(balance, 0, 'Balance equals 0 when Initialized');
    });

    it('Receives eth from an external account', async () => {
        await web3.eth.sendTransaction({
            to: contract.options.address,
            from: accounts[0],
            value: web3.utils.toWei('1', 'ether'),
        });
        const balance = parseInt(await contract.methods.getBalance().call());
        chaiAssert.equal(
            balance,
            web3.utils.toWei('1', 'ether'),
            'Balance does not equal amount received',
        );
    });
});
