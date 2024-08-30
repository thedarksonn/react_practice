import express from 'express'
import User from '../../models/user.js'
import Article from '../../models/article.js'
import { checkAuth } from '../middleware/checkAuth.js'
import { stripe } from '../utils/stripe.js'

const router = express.Router()



router.get("/prices", checkAuth, async (req, res) => {
    const prices = await stripe.prices.list({
        apiKey: process.env.STRIPE_SECRET_KEY
    })

    return res.json(prices)
})

router.post("/session", checkAuth, async (req, res) => {
    const user = await User.findOne({ email: req.user })



    const session = await stripe.checkout.sessions.create(
        {
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: req.body.priceId,
                    quantity: 1,
                }
            ],
            success_url: "http://localhost:5173/articles",
            cancel_url: "http://localhost:5173/article-plans",
            customer: user.stripedCustomerId,

        },
        {
            apiKey: process.env.STRIPE_SECRET_KEY,
        })

    return res.json(session)
})



export default router