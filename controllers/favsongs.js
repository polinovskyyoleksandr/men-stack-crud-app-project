const express = require('express')
const router = express.Router()

const Song = require('../models/song.js')
const User = require('../models/user.js')

router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id).populate('favoriteSongs')
    res.render('favsongs.ejs', { songs: user.favoriteSongs })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

router.post('/:songId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)

    if (!user.favoriteSongs.includes(req.params.songId)) {
      user.favoriteSongs.push(req.params.songId)
      await user.save()
    }

    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

router.delete('/:songId', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.session.user._id, {
      $pull: { favoriteSongs: req.params.songId }
    })

    res.redirect(`/users/${req.session.user._id}/songs`)
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

module.exports = router
