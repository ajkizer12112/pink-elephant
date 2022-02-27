const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const Word = require("../models/Word")

exports.addWord = asyncHandler(async (req, res, next) => {
     const word = await Word.create(req.body);
     res.json({success: true, data: word})
})

exports.getWords = asyncHandler(async (req, res, next) => {
     const query = {}
     const words = await Word.find(query);
     res.json({success: true, data: words})
})

exports.editWord = asyncHandler(async (req, res, next) => {
     let word = await Word.findById(req.params.id);
     word = Object.assign(word, req.body);
     await word.save();
     res.json({success: true, data: word})
})

exports.getWordById = asyncHandler(async (req, res, next) => {
     const word = await Word.findById(req.params.id);
     res.json({success: true, data: word})
})

exports.removeWord = asyncHandler(async (req, res, next) => {
     await Word.findByIdAndRemove(req.params.id);
     res.json({success: true})
})

