var express = require("express");
var mongoose = require("mongoose");
var cors = require('cors');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();
var app = express();

var PORT = process.env.PORT || 3001;

var MongoURL = process.env.MONGO_URL;

var connection = mongoose.connection;
mongoose.connect(MongoURL);
connection.once("open", () => {
    console.log ("DB Connected!");
});

app.use(cors());
app.use(bodyParser.json());

//Import routes
var usersRouter = require('./routes/users');
var peopleRouter = require('./routes/people');
var giftsRouter = require('./routes/gifts');

// Api routes
app.use('/api/auth', usersRouter);
app.use('/api', peopleRouter);
app.use('/api', giftsRouter);

app.listen(PORT, () =>{
    console.log(`Server running on Prot: ${PORT}`)
    });