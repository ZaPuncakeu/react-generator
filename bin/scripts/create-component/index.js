import inquirer from 'inquirer';
import logger from '../../logger.js';
import path from 'path';
import fs from 'fs'
import ejs from 'ejs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function createComponent() {
    while(true) {
        
        const { answer } = process.argv.length > 4 ? 
                {"answer": process.argv[4]} 
                : 
                await inquirer.prompt([{
                    name: "answer",
                    message: "Write your component's name (respect the React casing convension for example: 'MyComponentName') :"
                }])

        if(answer.length == 0) {
            logger.error('Please input a component name...'); 
            continue;
        }

        const srcPath =  path.join(process.cwd(), 'src');
        const componentsPath = path.join(srcPath, 'components');
        if(!fs.existsSync(srcPath)) {
            logger.error("An error occured, make sure to execute the script from the root folder...")
            return;
        }
        
        if(!fs.existsSync(componentsPath)) {
            fs.mkdirSync(componentsPath);
        }

        const newComponentPath = path.join(componentsPath, answer);
        if(fs.existsSync(newComponentPath)) {
            logger.error(`The component '${answer}' already exists.`);
            return;
        }

        fs.mkdirSync(newComponentPath);
        
        const nocss =  process.argv.includes('--nocss');
        const componentScript = ejs.render(fs.readFileSync(`${__dirname}/../../templates/component-script.ejs`, 'utf-8'), { componentName: answer, nocss });
        fs.writeFileSync(path.join(newComponentPath, 'index.jsx'), componentScript, 'utf-8');
        if(!nocss)
            fs.writeFileSync(path.join(newComponentPath, 'index.css'), '', 'utf-8');
        break;
    }
}
