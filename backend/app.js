const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const postRoutes = require('./routes/posts')

const app = express();

mongoose.connect("mongodb+srv://pranit:LlTcXcGYGBl37iDQ@cluster0-auzy7.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() =>{
    console.log('connected to database');
})
.catch(() =>{
    console.log('connection failed')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/api/posts', postRoutes)

module.exports = app;