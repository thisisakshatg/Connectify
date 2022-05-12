const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.route('/').get(likeController.getAllLikes).post(likeController.createLike);

router
  .route('/:id')
  // .patch(likeController.updateLike)
  .delete(likeController.deleteLike)
  .get(likeController.getLike);

module.exports = router;
