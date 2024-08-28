import colors from "./colors.js"

export default {
    log: (message, ...args) => {
        if(args.length > 0) console.log(`${colors.YELLOW}[LOG]${colors.WHITE} - ${message}`, args)
        else console.log(`${colors.YELLOW}[LOG]${colors.WHITE} - ${message}`)
    },
    error: (message, ...args) => {
        if(args.length > 0) console.error(`${colors.RED}[ERROR] - ${message}${colors.WHITE}`, args)
        else console.error(`${colors.RED}[ERROR] - ${message}${colors.WHITE}`)
    }
}