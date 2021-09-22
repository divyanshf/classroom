require('dotenv').config();
require('./config/dbConfig');
const path = require('path');
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes');
const postRoutes = require('./routes/postRoutes');
const assignRoutes = require('./routes/assignRoutes');
const cookieParser = require('cookie-parser');

// Set up the PORT
const PORT = process.env.PORT || 5000;

// Set up the express app
const app = express();
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());
app.use(cookieParser());

// Set up cors
app.use(
    cors({
        origin: process.env.DOMAIN,
        optionsSuccessStatus: 200,
    })
);

// Set up the routes
app.use('/auth', authRoutes);
app.use('/class', classRoutes);
app.use('/posts', postRoutes);
app.use('/assign', assignRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

// Set up listener
app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`);
});
