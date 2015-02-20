// Import Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Set the data types, properties and default values to our Schema.
var SpeakerSchema = new Schema({
    name:           { type: String, default: '' },
    company:        { type: String, default: '' },
    title:          { type: String, default: '' },
    description:    { type: String, default: '' },
    picture:        { type: String, default: '' },
    schedule:       { type: String, default: '' },
    createdOn:      { type: Date, default: Date.now }
});
module.exports = mongoose.model('Speaker', SpeakerSchema);