const express = require('express')

const {getWords, addWord, getWordById, editWord, removeWord} = require("../controllers/word")

const router = express.Router();

router.route("/")
            .get(getWords)
            .post(addWord)
router.route("/:id")
            .get(getWordById)
            .put(editWord)
            .delete(removeWord)

module.exports = router;