const express = require('express')

const {getDecks, addDeck, getDeckById, editDeck, removeDeck} = require("../controllers/deck")

const router = express.Router();

router.route("/")
            .get(getDecks)
            .post(addDeck)
router.route("/:id")
            .get(getDeckById)
            .put(editDeck)
            .delete(removeDeck)

module.exports = router;