const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, 'A comment must have a caption'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A comment must belong to a user'],
  },
});

/////////////////////QUERY MDLW
console.log('Middlewarw');
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
