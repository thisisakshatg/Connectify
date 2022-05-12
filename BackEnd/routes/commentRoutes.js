const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.route('/').get(commentController.getAllComments).post(commentController.createComment);

router
  .route('/:id')
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment)
  .get(commentController.getComment);

module.exports = router;
// Comment
//
