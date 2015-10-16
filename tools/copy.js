import path from 'path';
import replace from 'replace';
import task from './lib/task';
import copy from './lib/copy';
import watch from './lib/watch';

export default task('copy', async () => {
  await Promise.all([
    copy('src/public', 'core/public'),
    copy('src/content', 'core/content'),
    copy('package.json', 'core/package.json'),
  ]);

  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js"',
    paths: ['core/package.json'],
    recursive: false,
    silent: false,
  });

  if (global.WATCH) {
    const watcher = await watch('src/content/**/*.*');
    watcher.on('changed', async (file) => {
      const relPath = file.substr(path.join(__dirname, '../src/content/').length);
      await copy(`src/content/${relPath}`, `core/content/${relPath}`);
    });
  }
});
