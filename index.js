const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const userRouter = require('./user');
const homeRouter = require('./home');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/chapters', {useNewUrlParser: true});



app.use('/user', userRouter);
app.use('/', homeRouter);

app.use(session({
    name: 'Gabe\'s Login',
    saveUninitialized: false,
    resave: false,
    secret: 'new Secret',
    store: new FileStore(),
}))

function auth (req, res, next) {
    console.log(req.session);

  if(!req.session.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
  }
  else {
    if (req.session.user === 'authenticated') {
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
  }
}

app.use(auth);

app.listen(3001);
