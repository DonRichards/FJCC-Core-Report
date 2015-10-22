'use strict';

let _temporalUndefined = {};
let raw = _temporalUndefined;
let VIEW_ID = _temporalUndefined;

function _temporalAssertDefined(val, name, undef) { if (val === undef) { throw new ReferenceError(name + ' is not defined - temporal dead zone'); } return true; }

let google = require('googleapis');
let key = require('./loufreyinstitute.json');

let MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://127.0.0.1:27017/gatc', function (err, db) {
  if (err) throw err;
  // Find one document in our collection
  db.collection('users').findOne({}, function (err, doc) {
    //console.log(doc);
    db.close();
  });
});raw = String.raw;
VIEW_ID = 'ga:108646183';
let jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/analytics.readonly'], null);

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
   }
  let analytics = google.analytics('v3');
  queryData(analytics, 1);
  printReportInfo(analytics);
  sendToDB();
}); // jwtClient

let result = [];
let headers = [];

function queryData(analytics, y) {
  analytics.data.ga.get({
    'auth': jwtClient,
    'ids': _temporalAssertDefined(VIEW_ID, 'VIEW_ID', _temporalUndefined) && VIEW_ID,
    'metrics': 'ga:sessions, ga:sessionsPerUser, ga:timeOnPage, ga:uniqueEvents',
    'dimensions': 'ga:dimension1,ga:dimension2, ga:city, ga:regionId, ga:daysSinceLastSession, ga:browser, ga:sessionDurationBucket',
    'start-date': '365daysAgo',
    'end-date': 'yesterday',
    'sort': '-ga:sessions',
    'max-results': 1000,
    'start-index': y
  }, (err, response) => {
    if (err) {
      console.log(err);
    } // if
    result.push( response.rows );
    /*
    if(titles.length < 1){
      console.log("Already exist");
      let tempObj = response.columnHeaders;
      for (let prop in tempObj) {
        if (tempObj.hasOwnProperty(prop)) {
          titles.push( response.columnHeaders[prop].name );
          }; // if
        } // for
    } // if Out if
    */
    //console.log("Totla Results "+response.totalResults);
   if(!response.totalResults-999 > y){
     queryData(analytics, y+1000);
     };
    headers.push( response.columnHeaders );
    } // function
  );
}

function printReportInfo(results) {
  let output = [];
  for (let key in results.query) {
    output.push(key, ' = ', results.query[key], '\n');
  }
  console.log(output.join(''));
}

function sendToDB() {
      Array.from( [headers].keys() );
      Array.from( [results].values() );
      console.log( Array.entries() );
};
