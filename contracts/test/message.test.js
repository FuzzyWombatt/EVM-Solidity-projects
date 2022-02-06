import chai from 'chai'
import Ganache from 'ganache';
import Web3 from 'web3';
import { compile } from './util.js';

const INITIAL_MESSAGE = 'message'

const chaiAssert = chai.assert;

const web3 = new Web3(Ganache.provider());

let accounts;
let contract;

beforeEach(async () => {
    const { bytecode, abi } = compile('Message.sol');
    accounts = await web3.eth.getAccounts();

    contract = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Message', () => {
    it('Deploys the Message contract', () => {
        chaiAssert.isOk(contract.options.address, 'Contract needs a valid address to be deployed');
    });

    it('Checks if contract has a default message', async () => {
        const message = await contract.methods.message().call();
        chaiAssert.equal(message, INITIAL_MESSAGE, 'The contract needs to have a default message')
    });

    it('Checks if changeMessage() changes the messgae to a new value', async () => {
        await contract.methods.changeMessage('different').send({from: accounts[0]});
        const message = await contract.methods.message().call();
        chaiAssert.notEqual(INITIAL_MESSAGE, message, 'New message should not equal initial')
    })
});
