const express = require('express')
const _ = require('lodash')

const PostModel = require('../../model/post')

const router = express.Router()

// get login user basic information
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

// get login user's and following's posts
router.get('/posts', async (req, res) => {
  try {
    if (!req.user) {
      throw new Error('尚未登入')
    }

    let queryUserIdArray = [
      req.user._id,
      ...req.user.following
    ]
    let queredPosts = await PostModel.find({
      'author': {
        $in: queryUserIdArray
      }
    }, null, {
      sort: {
        created: -1
      }
    })
    let opt = {
      path: 'author',
      select: ['_id', 'account', 'name', 'profileImg']
    }
    let populatedPosts = await PostModel.populate(queredPosts, opt)

    res.json({
      result: true,
      posts: populatedPosts
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
