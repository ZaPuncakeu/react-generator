#!/usr/bin/env node
import inquirer from 'inquirer';
import choices from './choices.js';
import logger from './logger.js';

(async () => { 
    if(process.argv[2] === "create") {
        const { answer } = process.argv.length > 3 ? 
            {"answer": process.argv[3]} 
            : 
            await inquirer.prompt([{
                type: "list",
                name: "answer",
                message: "What do you want to create?",
                "choices": [
                    {
                        "name": "Component",
                        "value": "component"
                    },
                    {
                        "name": "Page",
                        "value": "page"
                    }
                ]
            }])
        
        if(!Object.keys(choices).includes(answer)) return logger.error(`Unknown command '${answer}'`);
        await choices[answer]();
    }
})();