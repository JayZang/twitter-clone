var express = require("express");
var router = express.Router();

// User regist
router.post('/', (req, res) => {
  res.send('Regist')
})

// User login
router.post('/login', (req, res) => {
res.send('Login')
})

// User logout
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router;
