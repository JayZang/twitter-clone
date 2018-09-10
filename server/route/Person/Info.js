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

// 取得用戶所追蹤的人的資料
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
    select: ['_id', 'account', 'name']
  }
  let populatedPerson = await person.populate(opt).execPopulate()
  let following = populatedPerson.following

  // 判斷各用戶是否為已登入使用者的追蹤對象
  if (req.user) {
    following = following.map(item => {
      let _item = item.toObject()
      let isFollowing = !!req.user.following.find(val => val.toString() === _item._id.toString())
      _item.isFollowing = isFollowing

      return _item
    })
  }

  res.json({
    result: true,
    following
  })
})

// 取得用戶所追蹤的人的資料
router.get('/:account/follower', async (req, res) => {
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
    path: 'follower',
    select: ['_id', 'account', 'name']
  }
  let populatedPerson = await person.populate(opt).execPopulate()
  let follower = populatedPerson.follower

  // 判斷各用戶是否為已登入使用者的追蹤對象
  if (req.user) {
    follower = follower.map(item => {
      let _item = item.toObject()
      let isFollowing = !!req.user.following.find(val => val.toString() === _item._id.toString())
      _item.isFollowing = isFollowing

      return _item
    })
  }

  res.json({
    result: true,
    follower
  })
})

// 取得指定使用者貼文，此處需使用使用者的 _id
router.get('/:id/posts', async (req, res) => {
  try {
    let opt = {
      path: 'posts'
    }
    let user = await UserModel.findById(req.params.id, '_id account name posts profileImg')
    let populatedUser = await user.populate(opt).execPopulate()

    res.json({
      result: true,
      person: populatedUser
    })
  } catch (e) {
    res.json({
      result: false,
      errMsg: '無此用戶',
      err: e
    })
  }
})

module.exports = router
