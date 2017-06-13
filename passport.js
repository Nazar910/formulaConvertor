const { Strategy:JwtStrategy, ExtractJwt} = require('passport-jwt');
const User = require('./models/user');

module.exports = function(passport) {
    "use strict";
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = process.env.SECRET;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload._doc._id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => done(err, false))
    }))
};
