const express = require('express');
const app = express();
const path = require('path');
const port = ( process.env.PORT || 5000 );

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.render('index');
});

// Error handling
app.get('*', (req, res) => {
  console.log("Invalid URL processed: ", req.url);
  res.status(404).render('404', {url: req.url});
});

app.listen(port, () => {
  console.log('Server listening in on port ', port);
});
