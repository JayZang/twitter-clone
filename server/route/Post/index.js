var express = require('express')
var _ = require('lodash')

var PostModel = require('../../model/post')

var router = express.Router()

// 用戶貼文
router.post('/', async (req, res) => {
  if (!req.user) {
    return res.json({
      result: false,
      errMsg: '尚未登入'
    })
  }

  let body = {
    author: req.user._id.toString(),
    ..._.pick(req.body, ['content'])
  }
  let post = PostModel(body)

  try {
    await post.save()
    req.user.posts.push(post._id)
    await req.user.save()
    res.json({
      result: true
    })
  } catch (e) {
    let errMsgArray = []
    let errMsg = '未知錯誤'

    if (e.errors) {
      Object.keys(e.errors).forEach(key => {
        errMsgArray.push(e.errors[key].message)
      })

      errMsg = errMsgArray.join(', ')
    }

    res.json({
      result: false,
      errMsg,
      err: e
    })
  }
})

module.exports = router
