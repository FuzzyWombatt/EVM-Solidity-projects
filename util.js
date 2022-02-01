import fs from 'fs';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk'

const __dirname = dirname(fileURLToPath(import.meta.url));

export const listContracts = () => {
    const contractPath = path.resolve(__dirname, 'contracts');

    const files = fs.readdirSync(contractPath);

    files.forEach(file => {
        if(path.extname(file) === ".sol"){
            console.log(chalk.red(file))
        }
    })
}
