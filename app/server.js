const express = require('express');
const app = express();
const path = require('path');
const port = ( process.env.PORT || 5000 );
const defaultRoutes = require(path.join(__dirname,'routes/defaultRoutes'));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));

app.use(defaultRoutes);

// Error handling
app.get('*', (req, res) => {
  console.log("Invalid URL processed: ", req.url);
  res.status(404).render('404', {url: req.url});
});

app.listen(port, () => {
  console.log('Server listening in on port ', port);
});
