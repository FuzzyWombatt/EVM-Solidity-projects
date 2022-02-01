//had to use es6 modules in order to have chalk functionality
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'

import { listContracts } from './util.js';


const cArgs = yargs(hideBin(process.argv));

cArgs.version('0.1.0');

cArgs.command({
    command: 'compile',
    describe: 'Compile a solidity contract, or a set of contracts',
    aliases: 'C',
    builder: {
        contracts: {
            describe: 'Name/title of contract or contracts. For multiple contracts seperate by a comma and a space EX: <"contract1, contract2">',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(argv.contracts)
    }
}).parse();

cArgs.command({
    command: 'list',
    aliases: 'ls',
    describe: 'List all the contracts available',
    handler: () => listContracts()
}).parse();


