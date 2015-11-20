import request from 'superagent';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
/**
 * [getUrl description]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
function getUrl (path) {
  if (path.startsWith('http') || canUseDOM) {
    return path;
  }
  let HOSTENV;

  if (process.env.WEBSITE_HOSTNAME) {
    HOSTENV = `http://${process.env.WEBSITE_HOSTNAME}${path}`;
  } else {
    HOSTENV = `http://127.0.0.1:${global.server.get('port')}${path}`;
  }

  return HOSTENV;
}

const HttpClient = {

  get: path => new Promise((resolve, reject) => {
    request
      .get(getUrl(path))
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null);
          } else {
            reject(err);
          }
        } else {
          resolve(res.body);
        }
      });
  })

};

export default HttpClient;
