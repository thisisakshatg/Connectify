const factory = require('./handlerFactory');
const Comment = require('../models/commentsModel');

exports.createComment = factory.createOne(Comment);
exports.getAllComments = factory.getAll(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
exports.getComment = factory.getOne(Comment);
