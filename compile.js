import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
import solc from 'solc'
import chalk from 'chalk'

const __dirname = dirname(fileURLToPath(import.meta.url));

const contractsPath = path.resolve(__dirname, 'contracts');
const buildPath = path.resolve(__dirname, 'build');

const filterContracts = (contracts) => {
    let contractsArr = contracts.split(', ');

    const contractFiles = fs.readdirSync(contractsPath);

    contractsArr = contractsArr.filter(contract => {
        const check = contractFiles.find(ele => ele === contract);

        if(check !== undefined){
            return true;
        }else{
            console.log(chalk.red(`${contract} not found, couldn't compile`))
            return false
        }

    })

    return contractsArr;
}

export const compileContracts = (contracts) => {
    let str = "";

    const contractsArr = filterContracts(contracts);

    if(contractsArr.length === 0){
        return console.log(chalk.red('\nNo contracts to compile'))
    }

    
    const compilerInput = {
        language: "Solidity",
        sources: contractsArr.reduce((previous, contract) => {
            const source = fs.readFileSync(path.resolve(contractsPath, contract), 'utf-8');
            return {...previous, [contract]: {content: source}};
        }, {}),
        settings: {
            outputSelection: {
              "*": {
                "*": ["abi", "evm.bytecode.object"],
              }
            }
        }

    }
    //compile all contracts
    const compiled = JSON.parse(solc.compile(JSON.stringify(compilerInput)));
    console.log(compiled)

    //TODO: place in build folder....rewrite over prviousd code....add timestamps?

    console.log(str);
}
