/*
 * This is the main controller for routes
 * All imports of component routes go here and are configured here
 */

/*
 * Setting up aws config for all routing since aws will refer to the same instance
 * Important that I put this before importing routes since the routes utilize this instance of aws
 */
const aws = require('aws-sdk');
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const path = require('path');
const defaultRoutes = require(path.join(__dirname,'defaultRoutes'));
const signupRoutes = require(path.join(__dirname, 'signupRoutes'));
const userRoutes = require(path.join(__dirname, 'userRoutes'));


module.exports = (app) => {
  /*
   * Routes defined here
   */
  if(process.env.NODE_ENV == "production") {
    app.use((req, res) => {
      // Universal catcher; Disable other routes for now
      res.render('index');
    });
  }

  app.use('/', defaultRoutes);
  app.use('/signup', signupRoutes);
  app.use('/user', userRoutes);

  // Somewhat Error handling for development purposes
  app.use((req, res) => {
    console.log("Invalid URL processed: ", req.url);
    res.status(404).render('404', {url: req.url});
  });

  app.use((err, req, res, next) => {
    console.log("Entered universal error handler");
    console.log(err);
    res.send("Something went wrong page.");
  });
}
