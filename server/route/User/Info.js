var express = require('express')
var _ = require('lodash')

var router = express.Router()

// get logined user basic informations
router.get('/info', (req, res) => {
  try {
    if (!req.user) {
      throw new Error('尚未登入')
    }

    let user = _.omit(req.user.toObject(), [
        'password',
        'tokens'
      ])

    res.json({
      result: true,
      user
    })
  } catch (e) {
    let errMsgArray = []
    let errMsg = ''

    if (e.errors) {
      Object.keys(e.errors).forEach(key => {
        errMsgArray.push(e.errors[key].message)
      })

      errMsg = errMsgArray.join(', ')
    }

    !!errMsg && (errMsg += ', ')
    errMsg += e.message || '未知錯誤'

    res.json({
      result: false,
      errMsg,
      err: e
    })
  }
})

module.exports = router
