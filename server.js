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

const authController = require('./controlls/auth.js')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MONGODB ${mongoose.connection.name}`)
})

app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
    console.log(`This server is runnin on ${port}`)
})