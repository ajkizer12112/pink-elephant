const express = require('express')

const {getPhrases, addPhrase, getPhraseById, editPhrase, removePhrase} = require("../controllers/phrase")

const router = express.Router();

router.route("/")
            .get(getPhrases)
            .post(addPhrase)
router.route("/:id")
            .get(getPhraseById)
            .put(editPhrase)
            .delete(removePhrase)

module.exports = router;