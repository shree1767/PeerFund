const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config()

const app = express()
app.use(express.json())
const PORT = 4000;
require('dotenv').config()
const User = require("./models/User")
// var cors = require('cors')

// app.use(cors())
// const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

try {
    console.log('Database Connection Successful')
    mongoose.connect(process.env.MONGO_CONNECTION_URL)
}
catch (err) {
    alert(err)
}

// app.get('/test', (req, res) => {
//     console.log('test ok');
// });

// app.get('/hello', (req, res) => {
//     res.json('Hello from server');
// })


app.post('/register', async (req, res) => {
    const { name, email, date } = req.body;
    try {
        const userDocument = await User.create({
            name,
            email,
            // date: JSON.stringify(data)
            date
        });
        res.json(userDocument)
    } catch (e) {
        res.status(422).json(e);
    }


});

// app.get('/profile', async (req, res) => {

//     try {

//         const { name, email, _id } = await User.findById(userData.id)
//         res.json({ name, email, _id })
//     }
//     catch (e) {
//         res.json(e)
//     }

// })

app.listen(PORT);