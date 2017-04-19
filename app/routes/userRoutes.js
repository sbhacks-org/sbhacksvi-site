const router = require('express').Router();
const passport = require('passport');


router.get('/login', (req, res) => {
  if(req.isAuthenticated()){
    res.redirect('/user/content');
  } else {
    res.render('login');
  }
});

router.post('/login', passport.authenticate("local", {failureRedirect: '/user/login'}), (req, res) => {
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
