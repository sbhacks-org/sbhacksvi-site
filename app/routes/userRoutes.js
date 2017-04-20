const router = require('express').Router();
const passport = require('passport');


router.get('/login', (req, res) => {
  if (req.isAuthenticated()){
    return res.redirect('/user/content');
  }
  if (req.query.status == "unsuccessful"){
    return res.render('login', { message: "Wrong Username or Password. Please try again." });
  }
  if (req.query.status == "success"){
    return res.render('login', { message: "Successfully created an account" });
  }
  res.render('login');
});

router.post('/login', passport.authenticate("local", {failureRedirect: '/user/login?status=unsuccessful'}), (req, res) => {
  console.log('redirecting to /content');
  res.redirect('/user/content');
});

router.get('/logout', (req, res) => {
  console.log('logging out')
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next){
  // console.log(req);
  if (req.isAuthenticated()){
    return next();
  }
  res.status(401).send('You cannot access this page');
}

router.get('/content', isLoggedIn, (req, res) => {
  console.log('loaded up content');
  res.render('content', { user: req.user });
});

module.exports = router;
