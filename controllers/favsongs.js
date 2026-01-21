const express = require('express')
const router = express.Router()

const User = require('../models/user.js')
const Song = required('../models/song.js')

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        res.locals.favsongs = user.favsongs
        res.render('songs/index.ejs'), {favsongs:user.favsongs}
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})