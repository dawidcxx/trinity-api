var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var {authDb} = require('./database');
var hashPassword = require('../utils/hashPassword');

passport.use(new LocalStrategy(function (username, password, done) {
  var sha_pass_hash = hashPassword(username, password);

  var sql = authDb.query(
    `SELECT id, username, sha_pass_hash FROM account WHERE username = ? AND sha_pass_hash = ?`,
    [username.toUpperCase(), sha_pass_hash],
    function (err, result) {
      if (err) {
        return done(err);
      }
      if (!result || result.length != 1) {
        return done(null, false);
      }
      if (result[0].sha_pass_hash != sha_pass_hash) {
        return done(null, false);
      } else {
        return done(null, { id: result[0].id });
      }
    })
}));


passport.serializeUser(function (user, done) {
  return done(null, user.id);
})

class SerializedUser {
  constructor({email, expansion, id, joindate, last_attempt_ip, username, gmlevel}) {
    this.email = email;
    this.expansion = expansion;
    this.id = id;
    this.joindate = joindate;
    this.last_attempt_ip = last_attempt_ip;
    this.username = username;
    this.gmLevel = gmlevel || 0;
  }
}

passport.deserializeUser(function (id, done) {
  return authDb.query(
    `SELECT *
      FROM account 
      LEFT JOIN account_access on (account.id = account_access.id)
      WHERE account.id = ? `,
    [id],
    function(err, result) {
      if (err) {
        done(err, null);
      } else {
        done(err, new SerializedUser(result[0]));
      }
    }
  )
});

module.exports = passport;