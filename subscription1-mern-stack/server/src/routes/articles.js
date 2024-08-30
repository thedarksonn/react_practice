import express from 'express'
import User from '../../models/user.js'
import Article from '../../models/article.js'
import { checkAuth } from '../middleware/checkAuth.js'
import { stripe } from '../utils/stripe.js'

const router = express.Router()


router.get("/", checkAuth, async (req, res) => {
    const user = await User.findOne({ email: req.user })

    const subscriptions = await stripe.subscriptions.list({
        customer: user.stripedCustomerId,
        status: "all",
        expand: ["data.default_payment_method"]
    },
        {
            apiKey: process.env.STRIPE_SECRET_KEY,
        }
    )

    if (!subscriptions.data.length) return res.json([])
    const plan = subscriptions.data[0].plan.nickname

    console.log(plan)

    if (plan === "Basic Plan") {
        const articles = await Article.find({ access: "basic" })
        return res.json(articles)
    }
    else if (plan === "Standard Plan") {
        const articles = await Article.find({
            access: { $in: ["basic", "standard"] }
        })
        return res.json(articles)
    }
    else {
        const articles = await Article.find({})
        return res.json(articles)
    }

    res.json(plan)

})


export default router