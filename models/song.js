const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }],
    genre: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }]
})

const Song = module.exports('Song', songSchema)