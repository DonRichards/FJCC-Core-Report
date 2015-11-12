import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
const server = global.server = express();
const port = process.env.PORT || 3000;
server.set('port', port);

// const cookieParser = require('cookie-parser');
// const compress = require('compression');
const favicon = require('serve-favicon');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const methodOverride = require('method-override');
const _ = require('lodash');
const flash = require('express-flash');

const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
// const sass = require('node-sass-middleware');
// import authController from './controllers/auth';
let secrets = require('./config/secrets');

/**
 * Connect to MongoDB.
 */
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});


//
// Register Node.js middleware
// -----------------------------------------------------------------------------
serverConfig(server);

//
// Register API middleware
// -----------------------------------------------------------------------------

/**
 * Controllers (route handlers).
 */
let userController = require('./controllers/user');


/**
 * API keys and Passport configuration.
 * authController(server);
 */
let passportConf = require('./config/passport');

server.use('/api/content', require('./api/content'));


import serverConfig from './Controllers/serverConfig';

server.get('/login', userController.getLogin);
server.post('/login', userController.postLogin);
server.get('/logout', userController.logout);
server.get('/forgot', userController.getForgot);
server.post('/forgot', userController.postForgot);
server.get('/reset/:token', userController.getReset);
server.post('/reset/:token', userController.postReset);
server.get('/signup', userController.getSignup);
server.post('/signup', userController.postSignup);
server.get('/contact', contactController.getContact);
server.post('/contact', contactController.postContact);
server.get('/account', passportConf.isAuthenticated, userController.getAccount);
server.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
server.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
server.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
server.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);

server.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));

server.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '' };
    const css = [];
    const context = {
      onInsertCss: value => css.push(value),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({ path: req.path, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n' + html);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
