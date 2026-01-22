const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true,
        ref: 'Artist'
    },
    genre: {
        type: String,
        required: true,
        ref: 'Genre'
    }
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song
