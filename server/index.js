require('dotenv').config();
const db = require('./config/dbConfig');
const express = require('express');
const cors = require('cors');

// Set up the PORT
const PORT = process.env.PORT || 8080;

// Set up the express app
const app = express();

// Set up cors
app.use(
    cors({
        origin: process.env.DOMAIN,
        optionsSuccessStatus: 200,
    })
);

// Set up listener
app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`);
});
