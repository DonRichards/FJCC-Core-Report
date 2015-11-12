const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const compress = require('compression');
const favicon = require('serve-favicon');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const methodOverride = require('method-override');
//  const _ = require('lodash');
const flash = require('express-flash');
const passport = require('passport');
const expressValidator = require('express-validator');
const sass = require('node-sass-middleware');
let secrets = require('../config/secrets');
const mongoose = require('mongoose');

module.exports = function(server) {
  server.use(compress());
  server.use(sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'expanded'
  }));
    
  server.use(logger('dev'));
  server.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(expressValidator());
  server.use(methodOverride());
  server.use(cookieParser());
  server.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secrets.sessionSecret,
    store: new MongoStore({ url: secrets.db, autoReconnect: true })
  }));
    
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(flash());
  server.use(lusca({
    csrf: true,
    xframe: 'SAMEORIGIN',
    xssProtection: true
  }));
    
  server.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
  });
    
  server.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
  server.use(errorHandler());
};
