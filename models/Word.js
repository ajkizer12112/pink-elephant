const mongoose = require('mongoose')

const Word = mongoose.Schema({
    English: String,
    Spanish: String,
    Filipino: String,
    French: String,
    German: String,
    Hindi: String,
    Korean: String,
    Italian: String,
    Danish: String,
    Hindi_romanized: String,
    Korean_romanized: String,
    Danish_romanized: String,
    learning_topics: [String],
})

module.exports = mongoose.model("Word", Word)