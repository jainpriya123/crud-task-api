const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server started on port ${port}!`));