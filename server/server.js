var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var AuthMiddleware = require('./middleware/Auth')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TwitterWeblike')
var app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(AuthMiddleware.GetLoginedUser)

// API 路由
var UserRouters = require ('./route/User')
UserRouters.forEach((RouteItem) => {
  app.use('/API/user/', RouteItem)
})


// 頁面路由
app.get('*', (req, res) => {
  res.send('hello World');
})

app.listen(8081, () => {
  console.log('Server is started')
})
