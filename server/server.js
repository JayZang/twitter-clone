var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TwitterWeblike')
var app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// API 路由
var UserRouter = require ('./route/user')
app.use('/API/user/', UserRouter)

// 頁面路由
app.get('*', (req, res) => {
  res.send('hello World');
})

app.listen(8081, () => {
  console.log('Server is started')
})
