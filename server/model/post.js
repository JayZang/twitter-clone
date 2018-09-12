var mongoose = require('mongoose')

var PostSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  created: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: [true, '貼文不能空白']
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
  }]
})

PostSchema.methods.toggleLike = async function (userId) {
  let post = this
  let index = post.likes.findIndex(item => item.toString() === userId.toString())

  if (index === -1) {
    post.likes.push(userId)
  } else {
    post.likes.splice(index, 1)
  }

  await post.save()
  return post
}

module.exports = mongoose.model('Posts', PostSchema)
