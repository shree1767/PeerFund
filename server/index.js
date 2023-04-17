const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express()
app.use(express.json())
const PORT = 4000;

mongoose.connect(process.env.MONGO_CONNECTION_URL)

app.get('/test', (req, res) => {
    console.log('test ok');
});

app.get('/hello', (req, res) => {
    res.json('Hello from server');
})

app.listen(PORT);