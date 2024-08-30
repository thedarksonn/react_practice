const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const connectDb = require('./db/db')
const itemModel = require('./models/itemModels')
const items = require('./utils/data')
require("colors");

connectDb();

//function seeder  npm run seed  check the package.json file for this command
//each time will run this file it will populate our item model with the items data from data.js in utils folder
const importData = async () => {
    try {
        await itemModel.deleteMany();
        const itemsData = await itemModel.insertMany(items);
        console.log("All Items Added".bgGreen);
        process.exit();
    } catch (error) {
        console.log(`${error}`.bgRed.inverse);
        process.exit(1);
    }
};

importData();