const genFiles = require("./lib/genFiles")
const arguments = require("./errors/arguments")

if (!process.argv[2]) throw new Error("Must provide an entity as an argument")

const args = process.argv.slice(2);

args.forEach(arg => {
    arguments.forEach(item => {
        if (item.check(arg)) item.error(arg);
    })
})

for (let i = 2; i < process.argv.length; i++) {
    const entityName = process.argv[i];
    genFiles(entityName)
}

process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1)
})