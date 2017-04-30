const path = require('path');
const defaultRoutes = require(path.join(__dirname,'defaultRoutes'));
const signupRoutes = require(path.join(__dirname, 'signupRoutes'));
const userRoutes = require(path.join(__dirname, 'userRoutes'));

module.exports = (app) => {
  /*
   * Routes defined here
   */

  app.use('/', defaultRoutes);
  app.use('/signup', signupRoutes);
  app.use('/user', userRoutes);

  // Somewhat Error handling for development purposes
  app.get('*', (req, res) => {
    console.log("Invalid URL processed: ", req.url);
    res.status(404).render('404', {url: req.url});
  });
}
