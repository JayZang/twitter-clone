var express = require('express')
var UserModel = require('../../model/user')

var router = express.Router()

// 取得用戶基本資訊
router.get('/:account', async (req, res) => {
  let personAccount = req.params.account
  let person = await UserModel.findOne({
    account: personAccount
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

router.get('/:account/following', async (req, res) => {
  let personAccount = req.params.account
  let person = await UserModel.findOne({
    account: personAccount
  })

  if (!person) {
    return res.json({
      result: false,
      errMsg: '無此用戶'
    })
  }

  let opt = {
    path: 'following',
    select: ['_id', 'account']
  }
  let populatedPerson = await person.populate(opt).execPopulate()
  res.json({
    result: true,
    'following': populatedPerson.following
  })
})

module.exports = router
