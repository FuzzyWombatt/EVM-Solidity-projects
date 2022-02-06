import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import solc from 'solc';
import chalk from 'chalk';
import { filterContracts } from './util.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const contractsPath = path.resolve(__dirname, 'contracts');
const buildPath = path.resolve(__dirname, 'build');

export const compileContracts = (contracts) => {
    if(typeof contracts !== 'string'){
        return console.log(chalk.red('Improper format of option. Must be a string input'));
    }

    const contractFiles = filterContracts(contracts, contractsPath);

    if (contractFiles.length === 0) {
        return console.log(chalk.red('\nNo contracts to compile'));
    }

    const compilerInput = {
        language: 'Solidity',
        sources: contractFiles.reduce((previous, contract) => {
            const source = fs.readFileSync(
                path.resolve(contractsPath, contract),
                'utf-8',    
            );
            return { ...previous, [contract]: { content: source } };
        }, {}),
        settings: {
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode.object', 'evm.bytecode.opcodes'],
                },
            },
        },
    };
    //compile all contracts
    const compiled = JSON.parse(solc.compile(JSON.stringify(compilerInput)));

    //make sure buildpath exists
    if (!fs.existsSync(buildPath)) {
        fs.mkdirSync(buildPath, { recursive: true });
    }

    contractFiles.map(file => {
        const compiledContracts = Object.keys(compiled.contracts[file]);
        compiledContracts.map(contract =>{
            fs.outputJsonSync(
                path.resolve(buildPath, contract+'.json'),
                compiled.contracts[file][contract]
            );
        });
    });

    let compileString = 'Compiled contracts ';
    //string concat grammer styling...necesary no but I want it this way
    contractFiles.map((contract, ind) => {
        if(ind === 0){
            compileString += contract;
        }else if(ind === (contractFiles.length-1)){
            if(contractFiles.length === 2){
                compileString += ' and ' + contract;
            }else{
                compileString += ', and ' + contract;
            }
        }else{
            compileString += ', '+contract;
        }
    });

    console.log(chalk.green(compileString));
};
