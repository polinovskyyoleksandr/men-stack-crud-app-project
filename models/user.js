const mongoose = require('mongoose');
const songSchema = require('./song').schema

const userSchema = mongoose.Schema ({
    username: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true,
    },
    liked: {
        favSongs: [songSchema]
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;