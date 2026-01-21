const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: String,
    artists: [artist],
    genres: [genre]
})

const userSchema = mongoose.Schema ({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    liked: {
        favSongs: [songSchema]
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;