const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Error - Game is missing title"]
        },
    coverArt : {
        type: String,
        required: [true, "Error - Game is missing cover art"]    
    },
    note: {
        type: String
    }
    }, { timestamps: true }
);

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;