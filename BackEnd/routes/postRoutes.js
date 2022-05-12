const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.post(
  '/create/contentImage',
  postController.uploadImageContent,
  postController.resizeImage,
  postController.createPost
);
router.post('/create/contentVideo', postController.uploadVideoContent, postController.createPost);

router.route('/').get(postController.getAllPosts);

router.route('/:id').delete(postController.deletePost).get(postController.getPost).patch(postController.updatePost);

router.patch(
  '/:id/update/contentImage',
  postController.uploadImageContent,
  postController.resizeImage,
  postController.updatePost
);

router.patch('/:id/update/contentVideo', postController.uploadVideoContent, postController.updatePost);

module.exports = router;
