const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)


const connection = mongoose.connection

connection.on('connected', () => {
    console.log('mongo db connected')
})

connection.on('error', (err) => {
    console.log('mongo connection fail')
})
module.exports = connection