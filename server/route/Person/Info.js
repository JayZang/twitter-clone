var express = require('express')
var UserModel = require('../../model/user')

var router = express.Router()

// 取得用戶基本資訊
router.get('/:Id', async (req, res) => {
  let personId = req.params.Id
  let person = await UserModel.findOne({
    account: personId
  })

  if (!person) {
    return res.json({
      result: false,
      errMsg: '無此用戶'
    })
  }

  let isFollowing = false
  if (req.user) {
    isFollowing = !!req.user.following.find(val => val.toString() === person._id.toString())
  }

  res.json({
    result: true,
    person,
    isFollowing
  })
})

module.exports = router
