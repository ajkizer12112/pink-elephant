
// Requiring the module
const reader = require('xlsx')

const read = (filename, entity) => {
    const file = reader.readFile(`${__dirname}/../_data/${filename}.xlsx`)
    const sheets = file.SheetNames
    if (!sheets.includes(entity)) return "Error: Entity does not exist"

    const data = reader.utils.sheet_to_json(file.Sheets[entity])
    let rtnVal = data

    rtnVal.forEach(item => {
        item.origin = item.origin.split(",")
        item.phRange = item.phRange.split(",").map(item => parseFloat(item, 10))
        item.hardnessRange = item.hardnessRange.split(",").map(item => parseInt(item, 10))
        item.temperatureRange = item.temperatureRange.split(",").map(item => parseInt(item, 10))
        item.lifespanRange = item.lifespanRange.split(",").map(item => parseInt(item, 10))
    })

    return rtnVal
}

const write = (filename, entity, data) => {
    const file = reader.readFile(`../_data/${filename}.xlsx`)
    const ws = reader.utils.json_to_sheet(data)

    reader.utils.book_append_sheet(file, ws, entity)
    reader.writeFile(file, `../_data/${filename}.xlsx`)
}


module.exports = { read, write }