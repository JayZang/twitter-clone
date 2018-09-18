const express = require('express')
const UserModel = require('../../model/user')
const _ = require('lodash')

const router = express.Router()

// User authentication, response user object when the token is valid,
router.get('/', async (req, res) => {
  if (!req.user) {
    return res.json({
      result: false,
      errMsg: '認證錯誤'
    })
  }

  // Set new token
  let token = await req.user.setAuthToken(req.headers['x-auth'])
  let user = _.omit(req.user.toObject(), [
    'password',
    'tokens'
  ])
  res.header('x-auth', token)
    .json({
      result: true,
      user
    })
})

// User register
router.post('/', async (req, res) => {
  let userBuf = _.pick(req.body, ['name', 'account', 'password'])
  let passwordConfirmed = req.body.password2

  // verify the two password is same
  if (userBuf.password !== passwordConfirmed) {
    return res.json({
      result: false,
      errMsg: '密碼確認不同'
    })
  }

  let user = new UserModel(userBuf)

  try {
    await user.save()

    let token = await user.setAuthToken()
    res.header('x-auth', token)
      .json({
        result: true,
        user
      })
  } catch (err) {
    let errMsg

    // custom err msg from mongoose err code
    if (err.code === 11000) {
      errMsg = '帳號已有人使用'
    } else if (err.errors && err.errors.password) {
      errMsg = err.errors.password.message
    } else {
      errMsg = '欄位請勿空白'
    }

    res.json({
      result: false,
      errMsg,
      err
    })
  }
})

// User login
router.post('/login', async (req, res) => {
  let body = _.pick(req.body, ['account', 'password'])

  try {
    let user = await UserModel.findByCredentials(body.account, body.password)
    let token = await user.setAuthToken()

    res.header('x-auth', token)
      .json({
        result: true,
        user
      })
  } catch (err) {
    res.json({
      result: false,
      errMsg: '帳號或密碼錯誤',
      err
    })
  }
})

module.exports = router
