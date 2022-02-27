const fs = require("fs");

const fileExists = (path) => {
    if (fs.existsSync(path)) {
        throw new Error(`File at path (${path}) already exists`)
    }
}

module.exports = { fileExists }