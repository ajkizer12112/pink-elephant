const fs = require("fs");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const excel = require("./excel")

const Phrase = require("./models/Phrase")

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
        const data = excel.readSingleSheet("BasicPhrases", "Sheet1")
        console.log(data);
        await Phrase.create(data);
        console.log("imported data.  Exiting")
        setTimeout(() => process.exit(), 1500)
    } catch (error) {
        console.error(error);
    }
}



const deleteData = async () => {
    try {
        console.log("deleting data")

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
