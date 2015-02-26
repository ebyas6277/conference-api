// Import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

// Define the schema for our user model
var userSchema = new Schema({
    local: {
        email: String,
        password: String
    }
});

// Generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Validating if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.comparySync(password, this.local.password);
};

// Create the model for users and export to app
module.exports = mongoose.model('User', userSchema);