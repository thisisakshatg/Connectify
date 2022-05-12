const Post = require('./../models/postsModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const sharp = require('sharp');
const multer = require('multer');
const AppError = require('../utils/appError');

//////////to upload image
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, 'true');
  } else cb(new AppError('Please choose na image or a video to upload', 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//////////// to upload video
const multerVideoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'FrontEnd/public/content/videos');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const videoUpload = multer({
  storage: multerVideoStorage,
  fileFilter: multerFilter,
});

exports.uploadVideoContent = videoUpload.single('content');

exports.uploadImageContent = upload.single('content');
exports.uploadUserPhoto = upload.single('photo');

exports.resizeImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  let x = 1500;
  let y = 1500;

  if (req.user) req.file.filename = `content-${req.user.id}-${Date.now()}.jpeg`;
  else {
    x = 500;
    y = 500;
    req.file.filename = `content-${req.body.email}-${Date.now()}.jpeg`;
  }

  await sharp(req.file.buffer)
    .resize(x, y, { position: 'top' })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`FrontEnd/public/content/imgs/${req.file.filename}`);

  next();
});

exports.createPost = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.content = req.file.filename;
  }

  const post = await Post.create({
    caption: req.body.caption,
    user: req.body.user,
    likes: req.body.likes,
    comments: req.body.comments,
    content: req.body.content,
  });

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.getAllPosts = factory.getAll(Post);
exports.getPost = factory.getOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);
