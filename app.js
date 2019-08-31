require("dotenv-safe").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const fileUpload = require('express-fileupload');

//routes
var indexRouter = require('./app/routes/index');
var usersRouter = require('./app/routes/users');
var authRouter = require('./app/routes/auth');
var videoRouter = require('./app/routes/videoRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const dataFilePath = path.join(process.cwd(),'datafile/');
if(!fs.existsSync(dataFilePath)){
  fs.mkdirSync(dataFilePath);
}

const tempDir = path.join(process.cwd(), 'tmp/');
if( fs.existsSync(tempDir) ){
  rimraf.sync(tempDir);
}
fs.mkdirSync(tempDir);

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : tempDir
}));

//enables cors
app.use(cors({
  'allowedHeaders': ['authorization', 'Content-Type'],
  'exposedHeaders': ['authorization'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/video', videoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
