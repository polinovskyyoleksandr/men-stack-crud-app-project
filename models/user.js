const mongoose = require('mongoose');

const userSchema = mongooseSchema ({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    favouriteSongs: {

    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;