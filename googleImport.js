'use strict';
/*
 * @_temporalUndefined
 */
// let _temporalUndefined = {};
// let raw = _temporalUndefined;
// let VIEW_ID = _temporalUndefined;
// function _temporalAssertDefined(val, name, undef) {
//   if (val === undef) {
//     throw new ReferenceError(name + ' is not defined - temporal dead zone');
//   }
//   return true;
// }

/*
 * Importing into the LocalHost Mongodb
 */
let google = require('googleapis');
let key = require('./authentication.json');
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
// let ObjectId = require('mongodb').ObjectId;

/*
 * @MongoClient
 */
MongoClient.connect('mongodb://127.0.0.1:27017/citizen', function(err, db) {
  if (err) throw err;
  /**
   * [password HASH removal]
   * @type {Object}
   */
  console.log("Database connected, cleaning up Users data");
  db.collection('users').update({ password : { $exists: true } }, { $unset:{ "password": 1 } } , { multi: true });

  /*
   * @jwtClient
   */
  // raw = String.raw;
  let VIEW_ID = 'ga:108646183';
  let jwtClient = new google.auth.JWT(key.client_email, null, key.private_key,
   ['https://www.googleapis.com/auth/analytics.readonly'], null);

  jwtClient.authorize(function(err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    let analytics = google.analytics('v3');

    /*
     * @contructor
     */
    queryData(analytics, "365daysAgo", 1);
    queryData(analytics, "180daysAgo", 1);
    queryData(analytics, "30daysAgo", 1);
  }); // jwtClient

  /*
   * @queryData
   */
  let queryData = function(analytics, days, y) {
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
      'start-index': y,
    }, (err, response) => {
      if (err) {
        console.log(err);
        } // if


        //generator(response.rows.length);

        /*
         * @forEach.rows
         */
        response.rows.forEach((rows) => {
          var setModifier ={ $set: {} };
          setModifier.$set[days] = {
                  "sessions": rows[1],
                  "sessionDuration": rows[2],
                  "pageviews": rows[3],
                  "timeOnPage": rows[4],
                  "totalEvents": rows[5],
                  "uniqueEvents": rows[6],
                  "sessionsPerUser": rows[7],
                  "hits": rows[8] };
            db.collection('users').update({
              "_gid": rows[0] },
                setModifier,
                (err, result) => {
              assert.equal(err, null);
            }); // db.collection
          }); //response.rows.forEach
      process.stdout.write('.');
      /*
       * @queryDataRecursion
       */
      if ((response.rows.length - y) >= 999) {
        queryData(analytics, days, y + 1000);
      } else {
        it.next();
        //console.log(days, response.rows.length, y);
        //let message = progress().next;
        //process.exit(0);
      }
    }
    ); // analytics.data.ga.get
  }; // queryData
}); // Mongo

function *progress () {
    console.log('\t 1st Import Complete');
  yield 1;
    console.log('\t 2nd Import Complete');
  yield 2;
    console.log('\t Final Import Complete');
  return exitApp();
}


function exitApp(callback) {
    setTimeout(() => callback(process.exit(0) ), 15);
}

var it = progress();

