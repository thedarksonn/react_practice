const mongoose = require('mongoose')
require('colors')

// connect db

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {

        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgYellow)
    } catch (error) {
        console.log(`Error: ${error.mesage}`.bgRed)
        process.exit(1)
    }
}


module.exports = connectDb;