const express = require('express')
const _ = require('lodash')

const CommentModel = require('../../model/comment')
const PostModel = require('../../model/post')

const router = express.Router()

// create a comment to a post
router.post('/post/:Id', async (req, res, next) => {
  try {
    // verify the auth status
    if (!req.user) {
      throw new Error('尚未登入')
    }

    // Verify the post is exist
    let targetPost = await PostModel.findById(req.params.Id)
      .catch(e => {
        throw new Error('非合法物件ID')
      })

    if (!targetPost) {
      throw new Error('找不到此貼文')
    }

    // Set comment model content
    let body = {
      ..._.pick(req.body, ['content']),
      user: req.user._id,
      target: {
        model: 'Posts',
        id: req.params.Id
      }
    }

    // implement the comment model
    let comment = new CommentModel(body)
    await comment.save()

    // Add the comment id to post's comment list
    targetPost.comments.unshift(comment._id)
    await targetPost.save()
    let detailTargetPost = await targetPost.getDetailCommentInfo()

    res.json({
      result: true,
      comments: detailTargetPost.comments
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
