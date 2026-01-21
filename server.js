//console.log('hello world')
const port = process.env.PORT ? process.env.PORT : '3000';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const bcrypt = require('bcrypt')

const Song = require('./models/song.js')
const authController = require('./controllers/auth.js')
const favsongsController = require('./controllers/favsongs.js')

const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MONGODB ${mongoose.connection.name}`)
})

app.use(express.urlencoded({ extended: false }))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
)

app.get('/', (req, res) => {
    res.render('index.ejs', {
        user: req.session.user,
    })
})

app.get('/', async (req, res) => {
  try {
    const songs = await Song.find()
    res.render('index.ejs', { songs })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

app.get('/songs/artist/:artist', async (req, res) => {
  try {
    const songs = await Song.find({ artist: req.params.artist })
    res.render('index.ejs', { songs })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

app.get('/songs/genre/:genre', async (req, res) => {
  try {
    const songs = await Song.find({ genre: req.params.genre })
    res.render('index.ejs', { songs })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})



app.use('/auth', authController)
app.use(methodOverride('_method'))
app.use(passUserToView)
app.use(isSignedIn)
app.use('/user/:userId/songs', isSignedIn, favsongsController)

app.listen(port, () => {
    console.log(`This server is runnin on ${port}`)
})