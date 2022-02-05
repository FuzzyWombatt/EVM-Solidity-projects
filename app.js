//had to use es6 modules in order to have chalk functionality
import yargs from 'yargs';

import { listContracts } from './util.js';
import { compileContracts } from './compile.js';

const cArgs = yargs();

cArgs.version('0.1.0');

cArgs.command({
    command: 'compile',
    describe: 'Compile a solidity contract, or a set of contracts',
    aliases: 'C',
    builder: {
        contracts: {
            describe: 'Name/title of contract or contracts. For multiple contracts seperate by a comma and a space EX: <"contract1, contract2">. Contract name must match exactly as it is in directory',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        compileContracts(argv.contracts);
    }
});

cArgs.command({
    command: 'list',
    aliases: 'ls',
    describe: 'List all the contracts available',
    handler: () => listContracts()
});
//doing this instead of yargs(hideBin(process.argv)) fixes double call on methods
cArgs.parse(process.argv.slice(2));
