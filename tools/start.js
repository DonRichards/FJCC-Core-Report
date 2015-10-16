import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import task from './lib/task';

global.WATCH = true;
const webpackConfig = require('./config')[0];
const bundler = webpack(webpackConfig);

export default task('start', async () => {
  await require('./build')();
  await require('./serve')();

  browserSync({
    proxy: {

      target: 'localhost:5000',

      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: webpackConfig.stats,
        }),
        webpackHotMiddleware(bundler),
      ],
    },
    files: [
      'core/public/**/*.css',
      'core/public/**/*.html',
      'core/content/**/*.*',
      'core/templates/**/*.*',
    ],
  });
});
