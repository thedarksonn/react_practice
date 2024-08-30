const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { bgCyan } = require('colors')
const dotenv = require('dotenv').config()
require('colors')
const connectDb = require('./db/db')


// db connection
connectDb()

// rest object
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan("dev"))


// // routes
// app.get('/', async (req, res) => {
//     res.send('<h1>pos backend</h1>')
// })


app.use("/api/items", require("./routes/itemRoutes"));



// port
const PORT = process.env.PORT || 8080
// listen
app.listen(PORT, () => {
    console.log(`server runing on http://localhost:${PORT}`.bgCyan.white)
})
