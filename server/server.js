var express = require('express');

var app = express();

app.get('*', (req, res) => {
  res.send('hello World');
})

app.listen(8081, () => {
  console.log('Server is started')
})
