const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name!'],
  },
  email: {
    type: String,
    required: [true, ' Please provide a valid email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, ' Please enter your password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!!'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords do not match!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user', 'employee', 'premiumUser'],
  },
  postCount: {
    type: Number,
    default: 0,
  },
  followerCount: {
    type: Number,
    default: 0,
  },
  followingCount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'Hi there! Im awesome!',
  },
  followers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
});

/////////////////////////////DCUMENT MIDDLEWARE
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now();
  next();
});

////////////////////////////INSTANCE METHODS
userSchema.methods.checkPasswords = async function (inputPwd, userPwd) {
  return await bcrypt.compare(inputPwd, userPwd);
};

userSchema.methods.tokenIssuedAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changePwdTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return changePwdTimestamp < JWTTimestamp;
  }
  return true;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;
