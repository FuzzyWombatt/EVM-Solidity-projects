const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractsPath = path.resolve(__dirname, 'contracts');
const buildPath = path.resolve(__dirname, 'build');


const contractPath = (contractName) => {
   return path.resolve(__dirname, 'contracts', contractName);
}



const source = fs.readFileSync(contractPath, 'utf-8');

const compileContracts = (contracts) => {
    let str = "";
    const contractArr = contracts.split(", ");



    console.log(str);
}

module.exports = {

}

