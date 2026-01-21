const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

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

router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        user.favsongs.push(req.body)
        await user.save()
        res.redirect(`/user/${user._id}/songs`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.put('/:songId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const song = user.favsongs.id(req.params.songId)
        song.title = req.body.title
        song.artist = req.body.arstist
        song.genre = req.body.genre
        await user.save()
        res.redirect(`/user/${user._id}/songs`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }

})

router.delete('/:songId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        user.favsongs.id(req.params.songId).remove()
        await user.save()
        res.redirect(`/user/${user._id}/songs`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router