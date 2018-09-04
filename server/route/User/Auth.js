var express = require("express")
var UserModel = require('../../model/user')
var _ = require('lodash')

var router = express.Router()

// User authentication, resonse user object when the token is valid,
router.get('/', async (req, res) => {
  if (!req.user) {
    return res.json({
      result: false,
      errMsg: '認證錯誤'
    })
  }

  res.header('x-auth', req.token)
    .json({
      result: true,
      user: req.user
    })
})

// User regist
router.post('/', async (req, res) => {
  let userBuf = _.pick(req.body, ['name', 'account', 'password'])
  let passwordConfirmed = req.body.password2

  // verify the two password is same
  if (userBuf.password !== passwordConfirmed){
    return res.json({
      result: false,
      errMsg: '密碼確認不同'
    });
  }

  let user = new UserModel(userBuf)

  try {
    await user.save()

    let token = user.setAuthToken();
    res.header('x-auth', token)
      .json({
        result: true,
        user
      })
  } catch (err) {
    let errMsg;

    // custom err msg from mongoose err code
    if (err.code === 11000){
      errMsg = '帳號已有人使用'
    } else if (err.errors && err.errors.password) {
      errMsg = err.errors.password.message
    } else {
      console.log(err)
      errMsg = '未知錯誤'
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
    let token = user.setAuthToken()

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

// User logout
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router;
