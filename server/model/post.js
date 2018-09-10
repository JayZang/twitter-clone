var mongoose = require('mongoose')

var PostSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: [true, '貼文不能空白']
  }
})

module.exports = mongoose.model('Posts', PostSchema)
