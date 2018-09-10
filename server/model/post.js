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
  }]
})

module.exports = mongoose.model('Posts', PostSchema)
