const express = require('express')
const dotenv = require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose');
const route = require('./routes/post');
const port = process.env.PORT || 4000

mongoose.set('strictQuery', true)
    .connect(process.env.MONGO_URL)
    .then(() => console.log(`Connected to db`))
    .catch((err) => console.log(`error ${err}`))

const app = express();

app.use(express.json());
app.use(cors())
app.use('/api/post', route)

app.listen(port, console.log(`Server Start on port ${port}`))