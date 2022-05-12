const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A like must belong to a user'],
  },
});

///////////////QUERY MIDDLEWARE
likeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
