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
  });
}