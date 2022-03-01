const fs = require("fs");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const excel = require("./excel")

const Phrase = require("./models/Phrase")
const Word = require("./models/Word")

//connect to db
const conn = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const importData = async () => {
    try {
        console.log("Importing data")
        const phrases = excel.readSingleSheet("BasicPhrases", "Phrases")
        await Phrase.create(phrases);
        console.log("created phrases")
        console.log("****DONE****")
        console.log("exiting....")
        setTimeout(() => process.exit(), 1500)
    } catch (error) {
        console.error(error);
    }
}



const deleteData = async () => {
    try {
        console.log("deleting data")
        await Phrase.deleteMany();
        await Word.deleteMany();
        console.log("deleted data.  Exiting")
        setTimeout(() => process.exit(), 1500)
    } catch (error) {
        console.error(error);
    }
}



//enter node seeder -i in the command line to import data, and node seeder -d to delete data.

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}
