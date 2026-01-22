const express = require('express')
const router = express.Router()
const Artist = require('../models/artist.js')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/new', isSignedIn, async (req, res) => {
  res.render('artists/new.ejs')
})

router.post('/', isSignedIn, async (req, res) => {
  await Artist.create(req.body)
  res.redirect('/artists')
})


router.get('/', isSignedIn, async (req, res) => {
  const artists = await Artist.find()
  res.render('artists/index.ejs', {artists})
})

module.exports = router