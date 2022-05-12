const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('Passwords cannot be updated using this route', 400));

  const filteredBody = filterObj(req.body, 'name', 'email', 'status');
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.getUserFromEmail = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError('No user exists with the provided email', 401));
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getUserFromName = catchAsync(async (req, res, next) => {
  const s = req.params.name;
  const regex = new RegExp(s, 'i'); // i for case insensitive
  const users = await User.find({ name: { $regex: regex } });

  if (!users) return next(new AppError('No user found with this name!', 400));

  res.status(200).json({
    status: 'success',
    data: {
      data: users,
    },
  });
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
