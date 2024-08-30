const express = require('express')
const cors = require('cors');
require('dotenv').config()
const dbConfig = require('./config/dbConfig')


const app = express()
app.use(express.json())
app.use(cors());


const userRoute = require('./routes/usersRoute')
const productRoute = require('./routes/productsRoute')

app.use('/api/users', userRoute)
app.use('/api/products', productRoute)













const port = process.env.PORT || 5000
app.listen(port, () => console.log(`node/express server started on port ${port}`))