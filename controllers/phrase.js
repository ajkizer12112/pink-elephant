const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const Phrase = require("../models/Phrase")

exports.addPhrase = asyncHandler(async (req, res, next) => {
     const phrase = await Phrase.create(req.body);
     res.json({ success: true, data: phrase })
})

exports.getPhrases = asyncHandler(async (req, res, next) => {
     let select;
     if (req.query.select) {
          let languages = req.query.select.split(",");
          languages.forEach(language => languages.push(`${language}_romanized`))
          select = languages.join(" ")
     } else {
          select = ("")
     }
     let query = {}
     const phrases = await Phrase.find(query).select(select);
     res.json({ success: true, data: phrases })
})

exports.editPhrase = asyncHandler(async (req, res, next) => {
     let phrase = await Phrase.findById(req.params.id);
     phrase = Object.assign(phrase, req.body);
     await phrase.save();
     res.json({ success: true, data: phrase })
})

exports.getPhraseById = asyncHandler(async (req, res, next) => {
     const phrase = await Phrase.findById(req.params.id);
     res.json({ success: true, data: phrase })
})

exports.removePhrase = asyncHandler(async (req, res, next) => {
     await Phrase.findByIdAndRemove(req.params.id);
     res.json({ success: true })
})

