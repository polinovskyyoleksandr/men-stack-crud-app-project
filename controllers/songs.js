const express = require('express')
const router = express.Router()
const Song = require('../models/song.js')
const Artist = require('../models/artist.js')
const Genre = require('../models/genre.js')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/new', isSignedIn, async (req, res) => {
  const artists = await Artist.find()
  const genres = await Genre.find()
  res.render('songs/new.ejs', { artists, genres })
})

router.post('/', isSignedIn, async (req, res) => {
  await Song.create(req.body)
  res.redirect('/')
})

// index route 
router.get('/', async (req, res) => {
  const songs = await Song.find().populate('Artist', 'Genre')
  res.render('songs/index.ejs')
})
// edit
router.get('/:id/edit', isSignedIn, async(req, res) => {
  const song = await Song.findById(req.params.id)
  const artists = await Artist.find()
  const genres = await Genre.find()
  res.render('songs/edit.ejs', {song, artists, genres})
})

// delete
router.delete('/:id', isSignedIn, async (req, res) => {
  await Song.findByIdAndDelete(req.params.id)
  res.redirect('/songs/index.ejs')
})

module.exports = router






// router.get('/artist/:id', async (req, res) => {
//   const songs = await Song.find({ artist: req.params.id }).populate('artist genre')
//   res.render('songs/list', { songs })
// })

// router.get('/genre/:id', async (req, res) => {
//   const songs = await Song.find({ genre: req.params.id }).populate('artist genre')
//   res.render('songs/list', { songs })
// })

