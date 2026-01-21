const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user.js')

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
})

router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs');
})

router.get('/sign-out', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.post('/sign-up', async (req, res) => {
    try {
        const userInDb = await User.findOne({ username : req.body.username })
        if (userInDb) {
            return res.send('Username is already taken!')
        }
        if (req.body.pwd !== req.body.confirmPwd) {
            return res.send('Your password and confirm password must match!')
        }
    const hashedPwd = bcrypt.hashSync(req.body.pwd, 10)
    req.body.pwd = hashedPwd
    await User.create(req.body)
    res.redirect('/auth/sign-in')
    } catch (err) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/sign-in', async (req, res) => {
    try {
        const userInDb = await User.findOne({ username : req.body.username })
        if (!userInDb) {
            return res.send('Login failed. Check if you are using the correct username or password')
        }
        const validPwd = bcrypt.compareSync(req.body.pwd, userInDb.pwd)
        if (!validPwd) {
            return res.send('Login failed. Check if you are using the correct username or password')
        }
        req.session.user = {
            username: userInDb.username,
            _id: userInDb._id
        }
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

module.exports = router;