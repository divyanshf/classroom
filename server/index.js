const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('Home');
});

app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`);
});
