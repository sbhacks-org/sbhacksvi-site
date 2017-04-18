const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/user');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
  console.log('serialize');
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log('deserialize');
  Users.findOne({_id: id}, (err, user) => {
    done(null, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (username, password, done) => {
  Users.findOne({email: username}, (err, user) => {
    if (err) { throw err; }
    if (!user) {
      return done(null, false, {message: 'No such user with email ' + username +'exists'});
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) { throw err; }
      if (res) {
        return done(null, user);
      }
      else {
        console.log("wrong pw supplied");
        return done(null, false, {message: 'invalid password'});
      }
    });
  });
}));

module.exports = passport;
