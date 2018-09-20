const express = require('express')
const _ = require('lodash')

const PostModel = require('../../model/post')

const router = express.Router()

// create new post
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
    req.user.posts.unshift(post._id)
    await req.user.save()

    let opt = {
      path: 'author',
      select: ['_id', 'account', 'name', 'profileImg']
    }
    let populatedPost = await post.populate(opt).execPopulate()

    res.json({
      result: true,
      post: populatedPost
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

// like or delete like post
router.get('/:Id/like', async (req, res) => {
  if (!req.user) {
    return res.json({
      result: false,
      errMsg: '尚未登入'
    })
  }

  try {
    let post = await PostModel.findById(req.params.Id)
      .catch(e => {
        throw new Error('錯誤格式ID')
      })

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

// get detail information of the indicated post
router.get('/:Id', async (req, res) => {
  try {
    let post = await PostModel.findById(req.params.Id)
      .catch(e => {
        throw new Error('錯誤格式ID')
      })

    if (!post) {
      throw new Error('找不到該貼文')
    }

    let DetailedPost = await post.getDetailAllInfo()
    DetailedPost = DetailedPost.toObject()

    let isFollowing = false
    if (req.user) {
      isFollowing = !!req.user.following.find(val => val.toString() === DetailedPost.author._id.toString())
    }
    DetailedPost.author.isFollowing = isFollowing

    res.json({
      result: true,
      post: DetailedPost
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
