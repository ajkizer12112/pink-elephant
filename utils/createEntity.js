const pluralize = require("pluralize");
const fs = require('fs')
const { fileExists } = require("../errors/files")
const { arguments } = require("../errors/arguments")

const capitalize = (entityName) =>
    entityName.charAt(0).toUpperCase() + entityName.slice(1);

const genModel = (writeStream, entityName) => {
    const entityNameCapitalized = capitalize(entityName);

    writeStream.write("const mongoose = require('mongoose')\n\n");
    writeStream.write(`const ${capitalize(entityName)} = mongoose.Schema({\n\n`);
    writeStream.write("})\n\n")
    writeStream.write(`module.exports = mongoose.model("${entityNameCapitalized}", ${capitalize(entityName)})`)
    writeStream.end();
}

const genControllers = (writeStream, entityName) => {
    const entityNameCapitalized = capitalize(entityName);
    const lines = [
        `const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)\n\n`,
        `const ${entityNameCapitalized} = require("../models/${entityNameCapitalized}")\n\n`,
        `exports.add${entityNameCapitalized} = asyncHandler(async (req, res, next) => {\n`,
        `     const ${entityName} = await ${entityNameCapitalized}.create(req.body);\n`,
        `     res.json({success: true, data: ${entityName}})\n`,
        `})`,
        `\n\n`,
        `exports.get${pluralize(entityNameCapitalized)} = asyncHandler(async (req, res, next) => {\n`,
        `     const query = {}\n`,
        `     const ${entityName}s = await ${entityNameCapitalized}.find(query);\n`,
        `     res.json({success: true, data: ${entityName}s})\n`,
        `})\n\n`,
        `exports.edit${entityNameCapitalized} = asyncHandler(async (req, res, next) => {\n`,
        `     let ${entityName} = await ${entityNameCapitalized}.findById(req.params.id);\n`,
        `     ${entityName} = Object.assign(${entityName}, req.body);\n`,
        `     await ${entityName}.save();\n`,
        `     res.json({success: true, data: ${entityName}})\n`,
        `})\n\n`,
        `exports.get${entityNameCapitalized}ById = asyncHandler(async (req, res, next) => {\n`,
        `     const ${entityName} = await ${entityNameCapitalized}.findById(req.params.id);\n`,
        `     res.json({success: true, data: ${entityName}})\n`,
        `})\n\n`,
        `exports.remove${entityNameCapitalized} = asyncHandler(async (req, res, next) => {\n`,
        `     await ${entityNameCapitalized}.findByIdAndRemove(req.params.id);\n`,
        `     res.json({success: true})\n`,
        `})\n\n`
    ]

    lines.forEach(line => writeStream.write(line))
    writeStream.end()
}

const genRoutes = (writeStream, entityName) => {
    const entityNameCapitalized = capitalize(entityName);

    const lines = [
        "const express = require('express')\n\n",
        `const {get${pluralize(entityNameCapitalized)}, add${entityNameCapitalized}, get${entityNameCapitalized}ById, edit${entityNameCapitalized}, remove${entityNameCapitalized}} = require("../controllers/${entityName}")\n\n`,
        "const router = express.Router();\n\n",
        `router.route("/")
            .get(get${pluralize(entityNameCapitalized)})
            .post(add${entityNameCapitalized})\n`,
        `router.route("/:id")
            .get(get${entityNameCapitalized}ById)
            .put(edit${entityNameCapitalized})
            .delete(remove${entityNameCapitalized})`,
        "\n\n",
        "module.exports = router;"
    ]

    lines.forEach(line => writeStream.write(line));
    writeStream.end();
}




const genFiles = (entityName) => {
    const modelDir = `${__dirname}/../models`;
    const controllerDir = `${__dirname}/../controllers`;
    const routeDir = `${__dirname}/../routes`;

    const entityNameCapitalized = pluralize(entityName)

    const finish = (err, path) => {
        if (err) console.log(err)
        else console.log(`created folder at path "${path}" because one did not exist`)
    }

    [modelDir, controllerDir, routeDir].forEach(item => {
        if (!fs.existsSync(item)) {
            fs.mkdir(item, (err) => finish(err, item))
        }

        [entityNameCapitalized, entityName].forEach(fileName => {
            fileExists(`${item}/${fileName}.js`)
        })
    })




    const modelStream = fs.createWriteStream(`${__dirname}/../models/${entityNameCapitalized}.js`);
    const controllerStream = fs.createWriteStream(`${__dirname}/../controllers/${entityName}.js`);
    const routeStream = fs.createWriteStream(`${__dirname}/../routes/${entityName}.js`)

    modelStream.once('open', () => genModel(modelStream, entityNameCapitalized))
    controllerStream.once('open', () => genControllers(controllerStream, entityName, entityNameCapitalized));
    routeStream.once('open', () => genRoutes(routeStream, entityName, entityNameCapitalized))
}


if (!process.argv[2]) throw new Error("Must provide an entity as an argument")

for (let i = 2; i < process.argv.length; i++) {
    const entityName = process.argv[i];
    genFiles(entityName)
}

process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1)
})