const AppError = require('../utils/appError');

const handleDuplicateFields = (err) => {
  const message = `Duplicate key value:"${err.keyValue.email}" : Please use another value.`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const msgArr = Object.values(err.errors).map((el) => el.message);
  const msg = `Invalid data provided. Please check the following:${msgArr.join('\n**')}`;
  return new AppError(msg, 400);
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleTokenError = () => new AppError('Invalid Token. Please try again', 401);

const handleTokenExpiredError = () => new AppError('Token Expired. Please login again', 401);

// Dev Errors
const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// Prod Errors
const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, req, res);
  else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.name === 'ValidationError') error = handleValidationError(error);
    if (error.name === 'CastError') error = handleCastError(error);
    if (error.name === 'JsonWebTokenError') error = handleTokenError(error);
    if (error.name === 'TokenExpiredError') error = handleTokenExpiredError(error);
    sendErrorProd(error, req, res);
  }
};
