// const path = require('path');
// const express = require('express');
// const userRouter = require('./routes/userRoutes');
// const postRouter = require('./routes/postRoutes');
// const likeRouter = require('./routes/likeRoutes');
// const commentRouter = require('./routes/commentRoutes');
// const globalErrorHandler = require('./controllers/errorController');
// const AppError = require('./utils/appError');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');

// const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
// const compression = require('compression');

// const app = express();
// app.enable('trust proxy');

// app.use(express.static(path.join(__dirname, '/FrontEnd/build')));

// ///////////////////MIDDLEWARES
// app.use(cors());
// app.options('*', cors());

// app.use(helmet());

// //Body parser
// app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// app.use(cookieParser());

// app.use(mongoSanitize());
// app.use(xss());
// app.use(compression());

// // ROUTES
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/posts', postRouter);
// app.use('/api/v1/likes', likeRouter);
// app.use('/api/v1/comments', commentRouter);

// app.use(globalErrorHandler);

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, '/FrontEnd/build', 'index.html'));
// });

// app.all('*', (req, res, next) => {
//   return next(new AppError(`The requested URL ${req.originalUrl} could not be found`, 404));
// });

// module.exports = app;
