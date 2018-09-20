const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  account: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: [8, '密碼長度須大於8位元']
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
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  follower: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  }],
  profileImg: {
    type: String,
    default: '/static/img/default-user-profile-img.png'
  },
  bkgWallImg: {
    type: String,
    default: '/static/img/default-user-bkg-img.jpg'
  }
})

// 用帳密取得用戶
UserSchema.statics.findByCredentials = async function (account, password) {
  let UserModel = this

  try {
    let user = await UserModel.findOne({account})
    if (!user) {
      return Promise.reject(new Error('User not fount'))
    }

    let result = bcryptjs.compareSync(password, user.password)

    if (!result) {
      return Promise.reject(new Error('Password is not correct'))
    }

    return user
  } catch (e) {
    return Promise.reject(e)
  }
}

// 用 token 取得用戶
UserSchema.statics.findByToken = function (token) {
  let UserModel = this

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    return UserModel.findOne({
      _id: decoded.id,
      'tokens.token': token,
      'tokens.access': 'auth'
    })
  } catch (e) {
    return Promise.reject(new Error(e))
  }
}

// 設置用戶 auth token
UserSchema.methods.setAuthToken = async function (replaceToken) {
  let user = this
  let access = 'auth'
  let token = jwt.sign({
    id: user._id,
    access,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3)
  }, process.env.JWT_SECRET)

  // delete token which equal to replaceToken
  if (replaceToken) {
    let tokenIndex = user.tokens.findIndex(item => item.access === access && item.token === replaceToken)
    tokenIndex >= 0 && user.tokens.splice(tokenIndex, 1)
  }

  user.tokens.push({
    access,
    token
  })

  await user.save()
  return token
}

// 存入資料庫前把密碼 Hash 起來
UserSchema.pre('save', function (next) {
  let user = this

  if (user.isModified('password')) {
    user.password = bcryptjs.hashSync(user.password, 10)
  }

  next()
})

module.exports = mongoose.model('Users', UserSchema)
