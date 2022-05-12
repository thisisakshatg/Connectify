const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A post must belong to a user'],
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Like',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
    },
  ],
});

//////////////////QUERY MIDDLEWARE
postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  })
    .populate('likes')
    .populate('comments');
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
