const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors()); 
const connectToDB = require('./databases/db')
connectToDB();

app.get("/", (req,res)=>{
    res.send("<h1>Welcome from App.js</h1>")
})

module.exports = app;