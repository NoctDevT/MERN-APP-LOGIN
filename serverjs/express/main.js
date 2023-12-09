const path = require('path')
const cors = require('cors');
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

// app config
const app = express();
const PORT = 5000;

// middlewares
app.use(cors({ origin: 'http://localhost:5000', credentials: true }));

app.use(express.json())
app.use(cookieParser());

// db connection
mongoose.connect(process.env.MONGO_LOGIN_STRING)
  .then(() => console.log('Connected successfully to MongoDB')).catch(err => {throw err;});

const messageRoutes = require('./routes/messageHandler')
const userRoutes = require('./routes/userHandler');

app.use('/message', messageRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success'
    });
});
app.listen(PORT, () => console.log(`Dolphin app listening on port ${PORT}!`))



