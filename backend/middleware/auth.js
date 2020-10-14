/* eslint-disable no-underscore-dangle */
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const config = require('config');
const Users = require('../models/UserModel');

// Setup work and export for the JWT passport strategy
function auth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.get('jwtSecret'),
  };
  passport.use(
    new JwtStrategy(opts, (payload, callback) => {
      const id = payload._id;
      Users.findById(id, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }),
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', { session: false });
