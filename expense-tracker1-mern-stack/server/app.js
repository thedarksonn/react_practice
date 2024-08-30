require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
const { readdirSync } = require('fs')




const app = express()


app.use(express.json())
app.use(cors())



// http://localhost:5000/api/v1/
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))







const PORT = process.env.PORT
const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()