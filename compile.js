const path = require('path');
const fs = require('fs');
const solc = require('solc');


const contractPath = (contractName) => {
   return path.resolve(__dirname, 'contracts', contractName);
}

const source = fs.readFileSync(contractPath, 'utf-8');

module.exports = {
    contracts: () => {
        solc.compile(source, 1).contracts
    }
}

