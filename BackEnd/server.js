const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const likeRouter = require('./routes/likeRoutes');
const commentRouter = require('./routes/commentRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception!! Shutting down!!💥');
  console.log(err.name, err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection 💥 Shuttin down!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

const app = express();
app.enable('trust proxy');

///////////////////MIDDLEWARES
app.use(cors());
app.options('*', cors());

//Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'default-src': ["'self'", '*'],
      'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'", '*'],
      'font-src': ["'self'", '*'],
      'style-src': ["'self'", 'https://*.googleapis.com', "'unsafe-inline'"],
      'connect-src': ["'self'", '*'],
      'img-src': ["'self'", 'data:', '*'],
    },
  })
);

app.use(mongoSanitize());
app.use(xss());
app.use(compression());

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/likes', likeRouter);
app.use('/api/v1/comments', commentRouter);

app.use(globalErrorHandler);

__dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/FrontEnd/build')));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'FrontEnd', 'build', 'index.html'));
});

app.all('*', (req, res, next) => {
  next(new AppError(`The requested URL ${req.originalUrl} could not be found`, 404));
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED!! Shutting down gracefully!');
  server.close(() => {
    console.log('💥Process Terminated!!');
  });
});
