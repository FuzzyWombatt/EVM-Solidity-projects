import chai from 'chai'
import Ganache from 'ganache';
import Web3 from 'web3';
import { compile } from './util.js';


const chaiAssert = chai.assert;

const web3 = new Web3(Ganache.provider());

let accounts;
let contract;

beforeEach(async () => {
    const { bytecode, abi } = compile('Lottery.sol');
   
    accounts = await web3.eth.getAccounts();

    contract = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode, arguments: [] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery', () => {
    it('Deploys the Lottery contract', () => {
        chaiAssert.isOk(contract.options.address, 'Contract does not have a valid address, not deployed');
    });

    it('Checks if the contract deployer and manager are the same', async () => {
        const manager = await contract.methods.manager().call();
        chaiAssert.equal(manager, accounts[0], 'Manager and deployer are not the same');
    });


    it('Allows an account to enter the lottery', async () => {
        await web3.eth.sendTransaction({to: contract.options.address, from: accounts[0], value: web3.utils.toWei('0.1', 'ether')})

        const players = await contract.methods.getPlayers().call();

        chaiAssert.equal(players[0],accounts[0] , 'Player is not in players array');
        chaiAssert.equal(players.length, 1 , 'Players does not have a length of 1');
    });
});

