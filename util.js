import fs from 'fs';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk'

const __dirname = dirname(fileURLToPath(import.meta.url));

export const filterContracts = (contracts, filePath) => {
    let contractsArr = contracts.split(', ');

    const contractFiles = fs.readdirSync(filePath);

    contractsArr = contractsArr.filter(contract => {
        const check = contractFiles.find(ele => ele === contract);

        if(check !== undefined){
            return true;
        }else{
            console.log(chalk.red(`${contract} not found, couldn't compile`))
            return false
        }

    })
    console.log(contractsArr);

    return contractsArr;
}

export const listContracts = () => {
    const contractPath = path.resolve(__dirname, 'contracts');

    const files = fs.readdirSync(contractPath);

    files.forEach(file => {
        if(path.extname(file) === ".sol"){
            console.log(chalk.blue(file))
        }
    })
}
