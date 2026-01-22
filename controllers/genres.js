const express = require('express')
const router = express.Router()
const Genre = require('../models/genre.js')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/new', isSignedIn, async (req, res) => {
  res.render('genres/new.ejs')
})

router.post('/', isSignedIn, async (req, res) => {
  await Genre.create(req.body)
  res.redirect('/genres')
})

router.get('/', isSignedIn, async (req, res) => {
  const genres = await Genre.find()
  res.render('genres/index.ejs', {genres})
})

module.exports = router