import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import solc from 'solc';
import chalk from 'chalk';
import { filterContracts } from './util.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const contractsPath = path.resolve(__dirname, 'contracts');
const buildPath = path.resolve(__dirname, 'build');

export const compileContracts = (contracts) => {
    const contractsArr = filterContracts(contracts, contractsPath);

    if (contractsArr.length === 0) {
        return console.log(chalk.red('\nNo contracts to compile'));
    }

    const compilerInput = {
        language: 'Solidity',
        sources: contractsArr.reduce((previous, contract) => {
            const source = fs.readFileSync(
                path.resolve(contractsPath, contract),
                'utf-8',    
            );
            return { ...previous, [contract]: { content: source } };
        }, {}),
        settings: {
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode.object'],
                },
            },
        },
    };
    //compile all contracts
    const compiled = JSON.parse(solc.compile(JSON.stringify(compilerInput)));
    console.log(compiled)

    //console.log(compiled.contracts[contractsArr[0]])
    //make sure buildpath exists
    if (!fs.existsSync(buildPath)) {
        fs.mkdirSync(buildPath, { recursive: true });
    }

    let compileString = 'Compiled contracts ';
    //string concat grammer styling...necesary no but I want it this way
    contractsArr.map((contract, ind) => {
        if(ind === 0){
            compileString += contract;
        }else if(ind === (contractsArr.length-1)){
            if(contractsArr.length === 2){
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
