const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Email = require('./../utils/email');

// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = (user, statusCode, req, res) => {
  const token = createToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
  });
};

////////////SIGNUP
exports.signup = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.filename;
  }

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    photo: req.body.photo,
    role: req.body.role,
    status: req.body.status,
    followers: req.body.followers,
    following: req.body.following,
  });
  const token = createToken(newUser._id);

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  res.cookie('jwt', token, cookieOptions);

  newUser.password = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      user: newUser,
      token,
    },
  });
});

////////////////LOGIN
exports.login = catchAsync(async (req, res, next) => {
  // 1.) Check if email and password both present
  if (!req.body.email || !req.body.password) return next(new AppError('Please provide your email and password', 400));

  // 2.) Check if user exists
  const user = await User.findOne({ email: req.body.email }).select('+password');

  // 3.) Check if passwords match
  if (!user || !(await user.checkPasswords(req.body.password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  // 3.) If everythig fine, send token to client
  sendToken(user, 200, req, res);
});

/////////////////LOGOUT
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

///////// PROTECTION
exports.protect = catchAsync(async (req, res, next) => {
  // 1.) Check if user is logged in
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt && req.cookies.jwt !== 'loggedout') {
    token = req.cookies.jwt;
  }

  console.log(token);

  if (!token) return next(new AppError('You are not logged in. Please log in to gain access', 401));

  // 2.) Verify user
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3.) Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError('User does not exist', 401));

  // 4.) Check if user changed password
  if (!user.tokenIssuedAfter(decoded.iat)) return next(new AppError('User password changed. Please login again', 401));

  req.user = user;
  return next();
});

//////////////////AUTHORISATION
exports.restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return next(new AppError('You are not authorised to perorm this action', 403));

    return next();
  };
};

/////////////////////////// PASSWORD RESET

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1.) Get user
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('User does not exist', 404));

  // 2.) Create password reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3.) Send user email
  try {
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    await new Email(user, resetURL, message).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Please check the email for further steps!!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordExpiresIn = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('Password Reset link could not be sent. Please try again later', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1.) Get user based on token
  const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError('Could not reset password. Please try again later', 400));

  // 2.) If user exists, set new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordExpiresIn = undefined;
  await user.save();

  sendToken(user, 200, req, res);
});

///////////////UPDATE PWD
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1.) Get user
  const user = await User.findById(req.user._id).select('+password');
  console.log(req.body.passwordCurrent, req.body.password, req.body.passwordConfirm);
  console.log(req.body);

  // 2.) Check passwords
  if (!(await user.checkPasswords(req.body.passwordCurrent, user.password)))
    return next(new AppError('Wrong Password provided. Please try again', 401));

  // 3.) Update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  sendToken(user, 200, req, res);
});
