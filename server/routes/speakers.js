var express = require('express');
var router = express.Router();
var Speaker = require('../models/speaker');

// A simple middleware to use for all Routes and Requests
router.use(function(req, res, next) {    
    // Give some message on the console
    console.log('An action was performed by the server.');

    // It's very important to use the next() function. Without this the route stops here.
    next();
});

// GET all users
router.get('/', function(req, res) {
    //res.json({ message: 'Hello SPA, the API is working!' });
    Speaker.find(function (err, speakers) {
        if (err) {
            res.send(err);
        }

        res.json(speakers);
    });
});

// GET specific users by id
router.get('/:speaker_id', function (req, res) {
    Speaker.findById(req.params.speaker_id, function (err, speaker) {
        if (err) {
            res.send(err);
        }

        res.json(speaker);
    });
});

// PUT users
router.post('/', function (req, res) {
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
    speaker.save(function (err) {
        if (err) {
            res.send(err);
        }

        // Give success message
        res.json({ message: 'Speaker successfully created!' });
    });
});

// Update specific users by id
router.put('/:speaker_id', function (req, res) {
    Speaker.findById(req.params.speaker_id, function (err, speaker) {
        if (err) {
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
        speaker.save(function (err) {
            if (err) {
                res.send(err);
            }

            // Give success message
            res.json({ message: 'Speaker successfully updated!' });
        });
    });
});

// Delete specific users by id
router.delete('/:speaker_id', function (req, res) {
    Speaker.remove({ _id: req.params.speaker_id }, function (err, speaker) {
        if (err) {
            res.send(err);
        }

        // Give success message
        res.json({ message: 'Speaker successfully deleted!' });
    });
});

module.exports = router;
