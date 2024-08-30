import express from "express"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from "./routes/auth.js"
import subsRoutes from "./routes/subs.js"
import articlesRoutes from "./routes/articles.js"
import cors from "cors"
dotenv.config()


mongoose.connect(
    process.env.MONGO_URI
)
    .then(() => {
        console.log("connnected to mongodb")


        const app = express()
        app.use(express.json())
        app.use(cors())


        //http://localhost:8080/auth/signup
        app.use("/auth", authRoutes)
        app.use("/subs", subsRoutes)
        app.use("/articles", articlesRoutes)


        const PORT = 8080
        app.listen(PORT, () => {
            console.log(`now listening to port ${PORT})`)
        })


    })
    .catch((error) => {
        console.log(error)
        throw new Error
    })




