const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('./models/index');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
  console.log('serialize');
  done(null, user.uid);
});

passport.deserializeUser((id, done) => {
  console.log('deserialize');
  models.user.findOne({
    where: {
      uid: id
    }
  }).then((user) => {
    if(user){
      return done(null, user);
    }
    return done(null, false, { message: "I hope this error gets handled" });
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (username, password, done) => {
  models.user.findOne({
    where: {
      email: username
    }
  }).then((user) => {
    console.log("Found", user);
    if (!user) {
      return done(null, false, { message: 'No such user with email ' + username +'exists' });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      console.log("Entered bcrypt")
      if (err) { throw err; }
      if (res) {
        return done(null, user);
      }
      else {
        console.log("wrong pw supplied");
        return done(null, false, { message: 'invalid password' });
      }
    });
  });
}));

module.exports = passport;
