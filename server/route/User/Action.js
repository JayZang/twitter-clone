const express = require('express')
const UserModel = require('../../model/user')

const router = express.Router()

// follow other person
router.get('/follow/:UserAccount', async (req, res) => {
  if (!req.user) {
    return res.json({
      result: false,
      errMsg: '尚未登入'
    })
  }

  try {
    let targetUser = await UserModel.findOne({account: req.params.UserAccount})
    if (!targetUser) {
      throw new Error('無法追蹤未知用戶')
    }

    let user = req.user
    if (user.following.find(val => val.toString() === targetUser._id.toString())) {
      throw new Error('已追蹤過此用戶')
    } else if (user._id.toString() === targetUser._id.toString()) {
      throw new Error('無法追蹤自己')
    }

    let userPromise = user.update({
      $push: {
        following: targetUser._id
      }
    })

    let targetUserPromise = targetUser.update({
      $push: {
        follower: user._id
      }
    })

    await Promise.all([userPromise, targetUserPromise])

    return res.json({
      result: true
    })
  } catch (e) {
    return res.json({
      result: false,
      errMsg: e.message || '查看系統錯誤訊息',
      err: e
    })
  }
})

// delete follow someone
router.delete('/follow/:UserAccount', async (req, res) => {
  if (!req.user) {
    return res.json({
      result: false,
      errMsg: '尚未登入'
    })
  }

  try {
    let targetUser = await UserModel.findOne({account: req.params.UserAccount})
    if (!targetUser) {
      throw new Error('無此用戶')
    }

    let user = req.user
    if (!user.following.find(val => val.toString() === targetUser._id.toString())) {
      throw new Error('未追蹤此用戶')
    }

    let userPromise = user.update({
      $pull: {
        following: targetUser._id
      }
    })

    let targetUserPromise = targetUser.update({
      $pull: {
        follower: user._id
      }
    })

    await Promise.all([userPromise, targetUserPromise])

    return res.json({
      result: true
    })
  } catch (e) {
    return res.json({
      result: false,
      errMsg: e.message || '查看系統錯誤訊息',
      err: e
    })
  }
})

module.exports = router
