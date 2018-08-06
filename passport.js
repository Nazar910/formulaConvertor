const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('./models/user');

module.exports = function (passport) {
    'use strict';
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = process.env.SECRET;
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        User.findById(jwtPayload._doc._id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => done(err, false));
    }));
};
