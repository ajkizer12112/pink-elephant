const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const Deck = require("../models/Deck")

exports.addDeck = asyncHandler(async (req, res, next) => {
     const deck = await Deck.create(req.body);
     res.json({success: true, data: deck})
})

exports.getDecks = asyncHandler(async (req, res, next) => {
     const query = {}
     const decks = await Deck.find(query);
     res.json({success: true, data: decks})
})

exports.editDeck = asyncHandler(async (req, res, next) => {
     let deck = await Deck.findById(req.params.id);
     deck = Object.assign(deck, req.body);
     await deck.save();
     res.json({success: true, data: deck})
})

exports.getDeckById = asyncHandler(async (req, res, next) => {
     const deck = await Deck.findById(req.params.id);
     res.json({success: true, data: deck})
})

exports.removeDeck = asyncHandler(async (req, res, next) => {
     await Deck.findByIdAndRemove(req.params.id);
     res.json({success: true})
})

