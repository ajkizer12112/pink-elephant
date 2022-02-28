const mongoose = require('mongoose')

const Phrase = mongoose.Schema({
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
    categories: [String],
    learning_topics: [String],
    user_added: {
        type: Boolean,
        default: false
    },
    owner: mongoose.Schema.ObjectId,
})

module.exports = mongoose.model("Phrase", Phrase)