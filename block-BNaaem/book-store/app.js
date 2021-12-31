const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const indexRouterV1 = require('./routes/v1/index');
const booksRouterV1 = require('./routes/v1/books');
const usersRouterV1 = require('./routes/v1/users');

const indexRouterV2 = require('./routes/v2/index');
const booksRouterV2 = require('./routes/v2/books');
const usersRouterV2 = require('./routes/v2/users');
const commentsRouterV2 = require('./routes/v2/comments');



mongoose.connect(
  'mongodb://localhost/book-store',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => { console.log(err || 'connected: true'); },
);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouterV1);
app.use('/api/v1/books', booksRouterV1);
app.use('/api/v1/users', usersRouterV1);

app.use('/api/v2', indexRouterV2);
app.use('/api/v2/books', booksRouterV2);
app.use('/api/v2/users', usersRouterV2);
app.use('/api/v2/comments', commentsRouterV2);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ err });
});

module.exports = app;
