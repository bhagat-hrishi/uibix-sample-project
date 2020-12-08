const express = require('express')
const app = express();
const cors = require('cors');
const path = require('path')

// for db connection 
const mongoose = require('mongoose');
const bodyparser=require('body-parser');

app.use(bodyparser.json());
app.use(cors({ origin: 'http://localhost:3000' }));//this will allow request from any port number or domain

// For .env file
require('dotenv/config')

// Getting URL from .env file and db connection

// for coneection with mogno atlas
let dburl = process.env.ATLAS_URI;

// for connection with local system dataBase
// let dburl = 'mongodb://localhost:27017/uibixDatabase'

mongoose.connect(dburl, {useNewUrlParser:true , useUnifiedTopology: true } , ()=>{
    console.log('Connected To DB')
})

// importing Routes
const signInController = require('./routes/signin')
const signUpController = require('./routes/signup')

//Routes
app.use('/signup',signUpController)
app.use('/signin',signInController)

app.use('/',(req,res)=>{
    res.send(`<h1>No Route Matched</h1>`)
})





const port = 9000 || process.env.PORT;//declare port


if(process.env.NODE_ENV === 'product'){
    
    app.use(express.static('Client/build'))
}


// For Listening
app.listen(port ,()=>{
    console.log(`Server Started At Port: ${port}`)
})

