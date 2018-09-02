var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
var bcryptjs = require('bcryptjs')

var UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  account:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

// 設置用戶登入 token
UserSchema.methods.setAuthToken = function () {
  let user = this
  let access = 'auth'
  let token = jwt.sign({
    id: user._id,
    access,
    exp:  Math.floor(Date.now() / 1000) + (60 * 60)
  }, 'Secret')

  user.tokens.push(token)
}

// 存入資料庫前把密碼 Hash 起來
UserSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    let hash = bcryptjs.hashSync(user.password, 10)
    user.password = hash
  }

  next()
})

module.exports = mongoose.model('Users', UserSchema);
