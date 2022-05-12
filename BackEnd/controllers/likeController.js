const Like = require('../models/likesModel');
const factory = require('./handlerFactory');

exports.createLike = factory.createOne(Like);
exports.getAllLikes = factory.getAll(Like);
exports.deleteLike = factory.deleteOne(Like);
exports.getLike = factory.getOne(Like);
