const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors')
const connectToDB = require('./databases/db')
const userRoutes = require('./routes/userRoutes');
connectToDB();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true}))


app.get("/", (req,res)=>{
    res.send("<h1>Welcome from App.js</h1>")
})

app.use('/user', userRoutes)

module.exports = app;