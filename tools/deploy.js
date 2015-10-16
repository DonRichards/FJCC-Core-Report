import GitRepo from 'git-repository';
import task from './lib/task';
import fetch from './lib/fetch';

const getRemote = (slot) => ({
  name: slot ? slot : 'production',
  url: `https://github.com/${slot ? '-' + slot : ''}/FJCC-Core-Report.git`,
  website: `http://fjccReport${slot ? '-' + slot : ''}.net`,
});

export default task('deploy', async () => {
  const remote = getRemote(process.argv.includes('production') ? null : 'staging');

  const repo = await GitRepo.open('build', { init: true });
  await repo.setRemote(remote.name, remote.url);

  if ((await repo.hasRef(remote.url, 'master'))) {
    await repo.fetch(remote.name);
    await repo.reset(`${remote.name}/master`, { hard: true });
    await repo.clean({ force: true });
  }

  process.argv.push('release');
  await require('./core')();

  await repo.add('--all .');
  await repo.commit('Update');
  await repo.push(remote.name, 'master');

  const response = await fetch(remote.website);
  console.log(`${remote.website} -> ${response.statusCode}`);
});
