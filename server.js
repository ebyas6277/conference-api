// Import the Modules installed to our server
var express = require('express');
var bodyParser = require('body-parser');

// Start the Express web framework
var app = express();

// Configure app
app.use(bodyParser());

// Where the application will run
var port = process.env.PORT || 8080;

// Import Mongoose
var mongoose = require('mongoose');

// Connect to our database
mongoose.connect('mongodb://127.0.0.1/conference');

// Start the Node Server
app.listen(port);
console.log('Magic happens on port ' + port);