const Matches = require('../models/matches.models');

module.exports = {

    getAllMatches(req, res) {
        Matches.find()
            .then(allMatches => res.status(200).json(allMatches))
            .catch(err => res.status(400).json(err));
    },

    getOneMatch(req, res) {
        Matches.findOne({ _id: req.params.id })
            .then(oneMatch => res.status(200).json(oneMatch))
            .catch(err => res.status(400).json(err));
    },

    createMatch(req, res) {
        Matches.create(req.body)
            .then(newNote => res.status(200).json(newNote))
            .catch(err => res.status(400).json(err));
    },

    deleteMatch(req, res) {
        Matches.deleteOne({ _id: req.params.id })
            .then(deleteConfirmation => res.status(200).json(deleteConfirmation))
            .catch(err => res.status(400).json(err));
    },
    
    addOrEditMatchNote(req, res) {
        Matches.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { note: req.body.note } },
            { new: true, runValidators: true }
        )
            .then(updatedMatch => res.status(200).json(updatedMatch))
            .catch(err => res.status(400).json(err));
    }
}