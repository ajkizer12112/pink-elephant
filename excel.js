
// Requiring the module
const reader = require('xlsx')
const Phrase = require("./models/Phrase")
const mongoose = require("mongoose");
const { transliterate } = require("transliteration")

const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });



const addToDb = async (data) => {


    const conn = mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });


    await Phrase.create(data)


}

const readSingleSheet = (filename, sheetName) => {
    const toTransliterate = ["Korean", "Hindi", "Danish"]

    const file = reader.readFile(`./data/${filename}.xlsx`)
    const sheets = file.SheetNames
    if (!sheets.includes(sheetName)) return "Error: sheetName does not exist"

    let data = reader.utils.sheet_to_json(file.Sheets[sheetName])

    if (filename === "BasicPhrases") {
        toTransliterate.forEach(language => {
            data.forEach(phrase => phrase[`${language}_romanized`] = transliterate(phrase[language]))
        })
    }

    return data
}

const writeToSheet = (filename, sheetName, data) => {
    const file = reader.readFile(`../_data/${filename}.xlsx`)
    const ws = reader.utils.json_to_sheet(data)

    reader.utils.book_append_sheet(file, ws, entity)
    reader.writeFile(file, `../_data/${filename}.xlsx`)
}

const excel = { readSingleSheet, writeToSheet }

module.exports = excel