'use strict';

let _temporalUndefined = {};
let raw = _temporalUndefined;
let VIEW_ID = _temporalUndefined;

function _temporalAssertDefined(val, name, undef) {
  if (val === undef) {
    throw new ReferenceError(name + ' is not defined - temporal dead zone');
  }

  return true;
}

let google = require('googleapis');
let key = require('./loufreyinstitute.json');

let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let ObjectId = require('mongodb').ObjectId;
let url = 'mongodb://127.0.0.1:27017/gatc';

MongoClient.connect('mongodb://127.0.0.1:27017/gatc', function(err, db) {
  console.log("db Fired ");
  if (err) throw err;
  db.collection('users').drop();

  raw = String.raw;
  VIEW_ID = 'ga:108646183';
  let jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/analytics.readonly'], null);

  jwtClient.authorize(function(err, tokens) {
    if (err) {
      console.log(err);
      return;
    }

    let analytics = google.analytics('v3');
    queryData(analytics, 1);
  }); // jwtClient

  let queryData = function(analytics, y) {
    console.log("queryData Fired ", y);
    analytics.data.ga.get({
      auth: jwtClient,
      ids: _temporalAssertDefined(VIEW_ID, 'VIEW_ID', _temporalUndefined) && VIEW_ID,
      metrics: 'ga:sessions, ga:sessionDuration, ga:pageviews, ga:timeOnPage, ga:totalEvents, ga:uniqueEvents, ga:sessionsPerUser, ga:hits',
      dimensions: 'ga:dimension1',
      'start-date': '365daysAgo',
      'end-date': 'yesterday',
      sort: '-ga:dimension1',
      type: 'dataTable',
      'max-results': 1000,
      'start-index': y,
    }, (err, response) => {
      if (err) {
        console.log(err);
      } // if

      response.rows.forEach((rows) => {
        db.collection('users').insert({
          dimensions1: rows[0],
          sessions: rows[1],
          sessionDuration: rows[2],
          pageviews: rows[3],
          timeOnPage: rows[4],
          totalEvents: rows[5],
          uniqueEvents: rows[6],
          sessionsPerUser: rows[7],
          hits: rows[8],
        }, (err, result) => {
          assert.equal(err, null);
        });
      });

      if ((response.rows.length - y) >= 999) {
        queryData(analytics, y + 1000);
      } else {
        process.exit(0);
      }
    }
);
  };
});
