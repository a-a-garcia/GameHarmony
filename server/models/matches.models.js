const mongoose = require('mongoose');

const noteValidator = (note) => {
    if (!note || note.trim() === '') {
      throw new Error("Note can't be empty!");
    }
    if (note.length > 255) {
      throw new Error("Note can't be longer than 255 characters!");
    }
  };

const MatchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Error - Game is missing title"]
        },
    coverArt : {
        type: String,
        required: [true, "Error - Game is missing cover art"]    
    },
    igdbUrl: {
        type: String,
        required: [true, "Error - Game is missing IGDB URL"]
    },
    note: {
        type: String,
        validate: [noteValidator, 'Note validation failed']
    }
    }, { timestamps: true }
);


const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;