import path from 'path';
import cp from 'child_process';
import task from './lib/task';
import watch from './lib/watch';

export default task('serve', () => new Promise((resolve, reject) => {
  function start() {
    const server = cp.fork(path.join(__dirname, '../build/server.js'), {
      env: Object.assign({ NODE_ENV: 'development' }, process.env),
      silent: false,
    });

    server.once('message', message => {
      if (message.match(/^online$/)) {
        resolve();
      }
    });
    server.once('error', err => reject(err));
    process.on('exit', () => server.kill('SIGTERM'));
    return server;
  }

  let server = start();

  if (global.WATCH) {
    watch('build/server.js').then(watcher => {
      watcher.on('changed', () => {
        server.kill('SIGTERM');
        server = start();
      });
    });
  }
}));
