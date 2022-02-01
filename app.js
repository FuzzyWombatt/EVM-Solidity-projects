const yargs = require('yargs');
const chalk = require('chalk')

yargs.command({
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
})

yargs.command({
    command: 'list',
    aliases: 'ls',
    describe: 'List all the contracts available',
    handler: () => {
        console.log(chalk.green('list contracts'));
    }
});


yargs.parse(process.argv.slice(2));