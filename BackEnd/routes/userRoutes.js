const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const postRouter = require('../routes/postRoutes');

const router = express.Router();

router.use('/:userId/posts', postRouter);

router.get('/logout', authController.logout);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updatePassword', authController.protect, authController.updatePassword);
router.get('/getUser/:name', userController.getUserFromName);

router.use(authController.protect);
router.patch('/updateMe', postController.uploadUserPhoto, postController.resizeImage, userController.updateMe);

// router.use(authController.restrict('admin'));

router.route('/').get(userController.getAllUsers).post(userController.getUserFromEmail);

router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
