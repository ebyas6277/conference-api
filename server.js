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

var Speaker = require('./server/models/speaker');



// Defining the Routes for our API

// Start the router
var router = express.Router();

// A simple middleware to use for all Routes and Requests
router.use(function(req, res, next) {    
    // Give some message on the console
    console.log('An action was performed by the server.');

    // It's very important to use the next() function. Without this the route stops here.
    next();
});

// Default message when accessing the API folder through the browser
router.get('/', function(req, res) {
    // Give some Hello there message
    res.json({ message: 'Hello SPA, the API is working!' });
});

// When accessing the speakers Routes, create a speaker when the method passed is POST
router.route('/speakers').post(function(req, res) {
    // Create a new instance of the Speaker model
    var speaker = new Speaker();

    // Set the speakers properties (comes from the request)
    speaker.name = req.body.name;
    speaker.company = req.body.company;
    speaker.title = req.body.title;
    speaker.description = req.body.description;
    speaker.picture = req.body.picture;
    speaker.schedule = req.body.schedule;

    // Save the data received
    speaker.save(function(err) {
        if(err) {
            res.send(err);
        }

        // Give success message
        res.json({ message: 'Speaker successfully created!' });
    });
});

router.route('/speakers').get(function(req, res) {
    // Get all the speakers when a method passed is Get
    Speaker.find(function(err, speakers) {
        if(err) {
            res.send(err);
        }

        res.json(speakers);
    });
});

// Accessing speaker route by id
router.route('/speakers/:speaker_id').get(function(req, res) {
    // Get the speaker by id
    Speaker.findById(req.params.speaker_id, function(err, speaker) {
        if(err) {
            res.send(err);
        }

        res.json(speaker);
    });
});

// Update the speaker by id
router.route('/speakers/:speaker_id').put(function(req, res) {
    Speaker.findById(req.params.speaker_id, function(err, speaker) {
        if(err) {
            res.send(err);
        }

        // Set the speaker properties (comes from the request)
        speaker.name = req.body.name;
        speaker.company = req.body.company;
        speaker.title = req.body.title;
        speaker.description = req.body.description;
        speaker.picture = req.body.picture;
        speaker.schedule = req.body.schedule;

        // Save the data received
        speaker.save(function(err) {
            if(err) {
                res.send(err);
            }

            // Give success message
            res.json({ message: 'Speaker successfully updated!' });
        });
    });
});

// Delete the speaker by id
router.route('/speakers/:speaker_id').delete(function(req, res) {
    Speaker.remove({ _id: req.params.speaker_id }, function(err, speaker) {
        if(err) {
            res.send(err);
        }

        // Give success message
        res.json({ message: 'Speaker successfully deleted!' });
    });
});

//Register the routes
app.use('/api', router);