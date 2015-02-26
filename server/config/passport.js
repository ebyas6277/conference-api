// Import passport module
var LocalStrategy = require('passport-local').Strategy;

// Import the user model
var User = require('../../server/models/user');

module.exports = function (passport) {
    // Passport setup
    // Serialize user
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // Deserialize user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // Configure local login strategy
    passport.use('local-login', new LocalStrategy({
        // Change default username and password to email and password
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },

    function (req, email, password, done) {
        if (email) {
            email = email.toLowerCase();
        }

        process.nextTick(function () {
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found'));
                }

                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Warning! Wrong password.'));
                } else {
                    return done(null, user);
                }
            });
        });
    }));

    // Configure signup local strategy
    passport.use('local-signup', new LocalStrategy({
        // Change default username and password to email and password
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },

    function (req, email, password, done) {
        if (email) {
            email = email.toLowerCase();
        }

        process.nextTick(function () {
            // If the user is not already logged in:
            if (!req.user) {
                User.findOne({ 'local.email': email }, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, false, req.flash('signumMessage', 'Warning! The email is already taken.'));
                    } else {
                        // Create the user
                        var newUser = new User();

                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save(function(err) {
                            if (err) {
                                throw err;
                            }

                            return done(null, newUser);
                        });
                    }
                });
            } else {
                // Everything ok, register user
                return done(null, req.user);
            }
        });
    }));
}