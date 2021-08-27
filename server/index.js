require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(
    cors({
        origin: process.env.DOMAIN,
        optionsSuccessStatus: 200,
    })
);

app.get('/', (req, res) => {
    res.send('Home');
});

app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`);
});
