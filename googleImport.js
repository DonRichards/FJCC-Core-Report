'use strict';
/*
 * @_temporalUndefined
 */
let _temporalUndefined = {};
let raw = _temporalUndefined;
let VIEW_ID = _temporalUndefined;
function _temporalAssertDefined(val, name, undef) {
  if (val === undef) {
    throw new ReferenceError(name + ' is not defined - temporal dead zone');
  }
  return true;
}

/*
 *
 */
let google = require('googleapis');
let key = require('./loufreyinstitute.json');
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let ObjectId = require('mongodb').ObjectId;
let url = 'mongodb://127.0.0.1:27017/gatc';
/*
 * @MongoClient
 */
MongoClient.connect('mongodb://127.0.0.1:27017/citizenTest', function(err, db) {
  console.log("Database is Connected");
  if (err) throw err;
  //db.collection('users').remove();

  /*
   * @jwtClient
   */
  raw = String.raw;
  VIEW_ID = 'ga:108646183';
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
      ids: _temporalAssertDefined(VIEW_ID, 'VIEW_ID', _temporalUndefined) && VIEW_ID,
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
        /*
         * @forEach.rows
         */
        response.rows.forEach((rows) => {
          var setModifier ={ $set: {}, $unset:{"password": 1} };
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
        process.exit(0);
      }
    }
    ); // analytics.data.ga.get
  }; // queryData
}); // Mongo
