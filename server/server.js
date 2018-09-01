var express = require('express');


var app = express();

app.get('*', (req, res) => {
  res.send('hello World');
})

app.listen(5327, () => {
  console.log('Server is started')
})
