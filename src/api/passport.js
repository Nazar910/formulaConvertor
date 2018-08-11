const config = require('../../config');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('./models/user');

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.get('JWT_SECRET');
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        User.findById(jwtPayload._id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => done(err, false));
    }));
};
