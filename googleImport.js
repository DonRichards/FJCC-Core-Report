#!/usr/bin/env babel-node
var google = require('googleapis');
var key = require('./loufreyinstitute.json');

const raw = String.raw;
const VIEW_ID = 'ga:108646183';

var jwtClient = new google.auth.JWT(
    key.client_email, null, key.private_key,
    ['https://www.googleapis.com/auth/analytics.readonly'], null);
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    var analytics = google.analytics('v3');
    iterateCount(analytics);
    queryData(analytics, 1);
  });
/* Itterate through 1000 at a time */
function queryData(analytics, x) {
      analytics.data.ga.get({
        'auth': jwtClient,
        'ids': VIEW_ID,
        'metrics': 'ga:sessions, ga:sessionsPerUser, ga:timeOnPage, ga:uniqueEvents',
        'dimensions': 'ga:dimension1,ga:dimension2, ga:city, ga:regionId, ga:daysSinceLastSession, ga:browser, ga:sessionDurationBucket',
        'start-date': '365daysAgo',
        'end-date': 'yesterday',
        'sort': '-ga:sessions',
        'max-results': 1000,
        'start-index': x,
      }, function (err, response) {
        if (err) {
          console.log(err);
        }
        console.log(JSON.stringify(response, null, 4));
      });
      // Check if there is a value @ x + 1000
      if(isitOrNot(analytics, x)){
        console.log("more");
      }
    }

function iterateCount(analytics) {
      analytics.data.ga.get({
        'auth': jwtClient,
        'ids': VIEW_ID,
        'metrics': 'ga:sessions',
        'start-date': '365daysAgo',
        'end-date': 'yesterday',
      }, function (err, response) {
        if (err) {
          console.log(err);
        }
        // Create a # of GUIDs
        console.log(response.rows[0][0]);
      });
    }

function isitOrNot(analytics, x) {
      analytics.data.ga.get({
        'auth': jwtClient,
        'ids': VIEW_ID,
        'metrics': 'ga:sessions',
        'dimensions': 'ga:dimension1',
        'start-date': '365daysAgo',
        'end-date': 'yesterday',
        'start-index': x+1000,
      }, function (err, response) {
        if (err) {
          return false;
        }
        // Create a # of GUIDs
          return true;
        });
    }
