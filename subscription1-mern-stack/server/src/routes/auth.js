import express from 'express'
import { body, validationResult } from 'express-validator'
import User from '../../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { stripe } from '../utils/stripe.js'

import { checkAuth } from '../middleware/checkAuth.js'

const router = express.Router()



router.post('/signup',

    body("email").isEmail().withMessage("the email is invalid"),
    body("password").isLength({ min: 5 }).withMessage("the password is too short"),

    async (req, res) => {

        const validationErrors = validationResult(req)

        if (!validationErrors.isEmpty()) {
            const errors = validationErrors.array().map(error => {
                return { msg: error.msg }
            })
            return res.json({ errors, data: null })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (user) {
            return res.json({
                errors: [{ msg: "email already in use", }], data: null
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const customer = await stripe.customers.create({
            email
        }, {
            apiKey: process.env.STRIPE_SECRET_KEY,
        })


        const newUser = await User.create({
            email,
            password: hashedPassword,
            stripedCustomerId: customer.id
        })

        const token = await jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: 360000, })
        // in a real application but atleast 3 days for expiring


        res.json({
            errors: [],
            data: {
                token,
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    stripedCustomerId: customer.id,
                }
            }
        })
    })





router.post('/signin', async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email });

    if (!user) {
        return res.json({
            errors: [{
                msg: "invalid credentials"
            }],
            data: null
        })
    }



    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({
            errors: [{
                msg: "invalid credentials"
            }],
            data: null
        })
    }

    const token = await jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: 360000, })

    return res.json({
        errors: [],
        data: {
            token,
            user: {
                id: user._id,
                email: user.email
            }
        }
    })

})

router.get("/me", checkAuth, async (req, res) => {
    const user = await User.findOne({ email: req.user })
    return res.json({
        errors: [],
        data: {
            user: {
                id: user._id,
                email: user.email,
                stripedCustomerId: user.stripedCustomerId,
            }
        }
    })
})




export default router