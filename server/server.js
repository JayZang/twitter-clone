// set configuration
require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const AuthMiddleware = require('./middleware/Auth')
const app = express()

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .catch(e => {
    console.log('Connecting database fail')
    console.log(e)
  })

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 設置靜態資料夾路徑（ js、css ... ）
app.use(express.static(path.resolve(__dirname, '../dist')))

// middleware setting
app.use(AuthMiddleware.GetLoginUser)

// API 路由
const UserRouters = require('./route/User')
const PersonRouters = require('./route/Person')
const PostRouters = require('./route/Post')
const CommentRouters = require('./route/Comment')
const SearchRouters = require('./route/Search')
UserRouters.forEach((RouteItem) => {
  app.use('/API/user/', RouteItem)
})
PersonRouters.forEach((RouteItem) => {
  app.use('/API/person/', RouteItem)
})
app.use('/API/post/', PostRouters)
app.use('/API/comment/', CommentRouters)
app.use('/API/search/', SearchRouters)

// 頁面路由
app.get('*', (req, res) => {
  let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})

app.listen(process.env.PORT, () => {
  console.log(`Server is started`)
  console.log(`Server environment: ${process.env.NODE_ENV}`)
  console.log(`Listening on ${process.env.PORT} port`)
  console.log('')
})

module.exports = {
  app
}
