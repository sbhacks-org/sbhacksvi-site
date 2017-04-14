const router = require('express').Router();


router.get('/',(req, res) => {
  res.render('index');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  res.end();
});

module.exports = router;
