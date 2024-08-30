require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./src/db');

const userRoutes = require("./src/routes/user");
const authRoutes = require("./src/routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());



// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);





const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`))