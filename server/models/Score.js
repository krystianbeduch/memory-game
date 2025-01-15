// models/Score.js
const mongoose = require('mongoose');

// Definicja schematu
const ScoreSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Tworzenie modelu
const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;
