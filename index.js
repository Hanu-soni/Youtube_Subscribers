//imported all the middleware and files  used in api creation and connecting to database


const express = require('express')//THIS IS A INTERNAL middleware accept the response of http request
const app = require('./app.js')//this is a app.js file . All api's are created here
const mongoose = require('mongoose')//This is a external Module to connect to mongodb and help in aggregation,schemacreation
//and document middleware
const dotenv = require("dotenv")//Again a external module to connect to .env file created


dotenv.config();//for env configuration



app.use(express.json())//to read and convert(PARSE) the json data sent by client .
app.use(express.urlencoded({ extended: false }));//// parse application/x-www-form-urlencoded


// Connection to DATABASE

//if env file does not give any value , then default connection string will work.
const DATABASE_URL = process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/subscribers";
//useNewUrlParser check bugs in new connection string and change with old url if bug is found.
//useUnified topology removes all previous connection and speed up the process.
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
//
const db = mongoose.connection//connect to mongodb
db.on('error', (err) => console.log(err))//if error, print it
db.once('open', () => console.log('connected to database'))//if successfull, show a message

// Start Server
const port = process.env.PORT || 3000;//if env file dont give port ...default port will be used.
app.listen(port, () => console.log(`App listening on port ${port}!`)); //listen api on port 3000.
