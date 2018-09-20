const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  created: {
    type: Date,
    default: Date.now
  },
  target: {
    model: {
      type: String,
      required: true
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model('Comments', CommentSchema)
