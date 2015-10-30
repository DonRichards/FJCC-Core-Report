'use strict';
/**
 * [google description]
 * @type {[type]}
 */
let google = require('googleapis');
let key = require('./authentication.json');
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

/*
 * @MongoClient
 */
MongoClient.connect('mongodb://127.0.0.1:27017/citizen', function mongoClient (err, db) {
  if (err) {
    throw err;
  }
  /**
   * [password HASH removal]
   * @type {Object}
   */
  /* console.log("Database connected, cleaning up Users data"); */
  db.collection('users').update({ password: { $exists: true } }, { $unset: { password: 1 } }, { multi: true });

  /*
   * @jwtClient
   */
  // raw = String.raw;
  let VIEW_ID = 'ga:108646183';
  let jwtClient = new google.auth.JWT(key.client_email, null, key.private_key,
   ['https://www.googleapis.com/auth/analytics.readonly'], null);

  jwtClient.authorize(function jwclinetAuth (err) {
    if (err) {
      process.stdout.write(err);
      return;
    }
    let analytics = google.analytics('v3');

    /*
     * @contructor
     */
    queryData(analytics, '365daysAgo', 1);
    queryData(analytics, '180daysAgo', 1);
    queryData(analytics, '30daysAgo', 1);
  });

  /**
   * [queryData description]
   * @param  {[type]} analytics  [description]
   * @param  {[type]} days       [description]
   * @param  {[type]} startIndex [description]
   * @return {[type]}            [description]
   */
  function queryData (analytics, days, startIndex) {
    analytics.data.ga.get({
      auth: jwtClient,
      ids: VIEW_ID,
      metrics: 'ga:sessions, ga:sessionDuration, ga:pageviews, ga:timeOnPage, ga:totalEvents, ga:uniqueEvents, ga:sessionsPerUser, ga:hits',
      dimensions: 'ga:dimension1',
      'start-date': days,
      'end-date': 'yesterday',
      sort: '-ga:dimension1',
      type: 'dataTable',
      'max-results': 1000,
      'start-index': startIndex
    }, (err, response) => {
      if (err) {
        process.stdout.write(err);
        return;
      }
      /**
       * [description]
       * @param  {[type]} (rows) [description]
       * @return {[type]}        [description]
       */
      response.rows.forEach((rows) => {
        let setModifier = { $set: {} };

        setModifier.$set[days] = {
          sessions: rows[1],
          sessionDuration: rows[2],
          pageviews: rows[3],
          timeOnPage: rows[4],
          totalEvents: rows[5],
          uniqueEvents: rows[6],
          sessionsPerUser: rows[7],
          hits: rows[8] };
        db.collection('users').update({
          _gid: rows[0] },
              setModifier,
        (err) => {
          assert.equal(err, null);
        });
      });
      process.stdout.write('.');
      /*
       * @queryDataRecursion
       */
      if ((response.rows.length - startIndex) >= 999) {
        queryData(analytics, days, startIndex + 1000);
      } else {
        it.next();
      }
    }
    );
  }
});

/**
 * [*progress description]
 * @yield {[type]} [description]
 */
function *progress () {
  process.stdout.write('\t 1st Import Complete\n');
  yield 1;
  process.stdout.write('\t 2nd Import Complete\n');
  yield 2;
  process.stdout.write('\t Final Import Complete\n');
  return exitApp();
}

/**
 * [exitApp description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function exitApp (callback) {
  setTimeout(() => callback(process.exit(0)), 3000);
}

let it = progress();

