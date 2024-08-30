const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')

// new user registration
router.post('/register', async (req, res) => {
    try {

        // check if user already existss
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            // return res.send({
            //     success: false,
            //     message: 'user already exists'
            // })
            throw new Error("user already exists")
        }
        // hash password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        // create new user
        const newuser = new User(req.body)
        await newuser.save()
        return res.send({
            success: true,
            message: 'user created successful'
        })


    } catch (error) {

        res.send({
            success: false,
            message: error.message
        })
    }

})

// login user
router.post('/login', async (req, res) => {
    try {
        // check if user existss
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error("user does not exists")
        }
        // compare password
        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            throw new Error("invalid password")
        }

        // create and asign token
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' })


        return res.send({
            success: true,
            message: 'user login sucessfully',
            data: token
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }

})


// get current loged in user
router.get('/get-current-user', authMiddleware, async (req, res) => {

    try {
        const user = await User.findById(req.body.userId)

        res.send({
            success: true,
            message: 'user fetched successfully',
            data: user,
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }

})












module.exports = router