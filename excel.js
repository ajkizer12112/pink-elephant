
// Requiring the module
const reader = require('xlsx')
const { transliterate } = require("transliteration")

const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });


const readSingleSheet = (filename, sheetName) => {
    const toTransliterate = ["Korean", "Japanese", "Chinese", "Russian",]

    const file = reader.readFile(`./data/${filename}.xlsx`)
    const sheets = file.SheetNames
    if (!sheets.includes(sheetName)) return "Error: sheetName does not exist"

    let data = reader.utils.sheet_to_json(file.Sheets[sheetName])

    if (filename === "Phrases1") {
        toTransliterate.forEach(language => {
            data.forEach(phrase => phrase[`${language}_romanized`] = transliterate(phrase[language]))
        })

        if (sheetName === "Phrases") data.forEach(phrase => phrase.category = "starting phrases")
        else if (sheetName === "animalsAndColors") data.forEach(phrase => phrase.category = "animals and colors")
        else if (sheetName === "present") data.forEach(phrase => phrase.category = "present")
        else if (sheetName === "presentAndShapes") data.forEach(phrase => phrase.category = "present and shapes")

    }

    return data
}

const writeToSheet = (filename, sheetName, data) => {
    const file = reader.readFile(`../data/${filename}.xlsx`)
    const ws = reader.utils.json_to_sheet(data)

    reader.utils.book_append_sheet(file, ws, entity)
    reader.writeFile(file, `../data/${filename}.xlsx`)
}

const excel = { readSingleSheet, writeToSheet }

module.exports = excel