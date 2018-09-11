var express = require('express')
var _ = require('lodash')

var PostModel = require('../../model/post')

var router = express.Router()

// 用戶發布貼文
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

// 喜歡或取消喜歡貼文
router.get('/:Id/like', async (req, res) => {
  if (!req.user) {
    return res.json({
      result: false,
      errMsg: '尚未登入'
    })
  }

  try {
    let post = await PostModel.findById(req.params.Id)
      .catch(e => {throw new Error('錯誤格式ID')})

    if (!post) {
      throw new Error('找不到該貼文')
    }

    await post.toggleLike(req.user._id)

    res.json({
      result: true,
      likes: post.likes
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

    if (e.message) {
      !!errMsg && (errMsg += ', ')
      errMsg += e.message
    }

    !errMsg && (errMsg = '未知錯誤')

    res.json({
      result: false,
      errMsg,
      err: e
    })
  }
})

module.exports = router
