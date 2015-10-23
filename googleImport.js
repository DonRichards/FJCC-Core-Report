'use strict';

let _temporalUndefined = {};
let raw = _temporalUndefined;
let VIEW_ID = _temporalUndefined;

function _temporalAssertDefined(val, name, undef) { if (val === undef) { throw new ReferenceError(name + ' is not defined - temporal dead zone'); } return true; }

let google = require('googleapis');
let key = require('./loufreyinstitute.json');
let result = [];
let headers = [];

let MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://127.0.0.1:27017/gatc', function (err, db) {
  if (err) throw err;
  // Find one document in our collection
  db.collection('users').findOne({}, function (err, doc) {
    //console.log(doc);
    db.close();
    });
  });

raw = String.raw;
VIEW_ID = 'ga:108646183';
let jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/analytics.readonly'], null);

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
   }
  let analytics = google.analytics('v3');
  queryData(analytics, 1).then( printReportInfo(analytics) );
  //finalize(analytics);
}); // jwtClient


let queryData = function (analytics, y) {
  analytics.data.ga.get({
    'auth': jwtClient,
    'ids': _temporalAssertDefined(VIEW_ID, 'VIEW_ID', _temporalUndefined) && VIEW_ID,
    'metrics': 'ga:sessions, ga:sessionDuration, ga:pageviews, ga:timeOnPage, ga:totalEvents, ga:uniqueEvents, ga:sessionsPerUser, ga:hits',
    'dimensions': 'ga:dimension1',
    'start-date': '365daysAgo',
    'end-date': 'yesterday',
    'sort': '-ga:dimension1',
    'type' : 'dataTable',
    'max-results': 1000,
    'start-index': y
    }, (err, response) => {
      if (err) {
        console.log(err);
       } // if

      getTheResults(response.rows);
      if( (response.totalResults) > (y+1000)){
        queryData(analytics, y+1000);
      }else {
        getTheHeaders(response);
      };

     } // function
  );
  return new Promise( function(res, rej) {
  setTimeOut(res, 1000);
  });
}

function getTheHeaders(response) {
    if(!headers.length){
      response.columnHeaders.map( (animal) => {
          headers.push( animal.name );
          return animal.name;
         }); // map
      }; // if
  };


function getTheResults(row) {
  var output = row.reduce( (customers, line) => {
    customers[line[0]] = [];
    customers[line[0]].push({
      id: line[0],
      sessions: line[1],
      sessionDuration: line[2],
      pageviews: line[3],
      timeOnPage: line[4],
      totalEvents: line[5],
      uniqueEvents: line[6],
      sessionsPerUser: line[7],
      hits: line[8]
    })
    return customers;
  }, {});
  console.log(output);
/*
  row.forEach(function(){
  });
*/
  //console.log(result);
};


function finalize(analytics) {
/*
    if(headers.length < 1){
      console.log("Already exist");
      let tempObj = response.columnHeaders;
      for (let prop in tempObj) {
        if (tempObj.hasOwnProperty(prop)) {
          headers.push( response.columnHeaders[prop].name );
          }; // if
        } // for
    } // if Out if

      console.log("Imported Headers "+ headers);
      let names = headers.map( (header) => header.name)
      console.log("Names are: "+names);
      //Array.from( [headers].keys() );
      //Array.from( [results].values() );
      //console.log( Array.entries() );
*/

};


function printReportInfo(analytics) {

//console.log(result.length);
/*
  let output = [];
  for (let key in results.columnHeaders) {
    output.push(key, ' = ', results.columnHeaders[key].name, '\n');
  }
  console.log(output.join(''));
  */

}

/*  ORIGINAL CONFIG
    'metrics': 'ga:sessions, ga:sessionsPerUser, ga:timeOnPage, ga:uniqueEvents',
    'dimensions': 'ga:dimension1,ga:dimension2, ga:city, ga:regionId, ga:daysSinceLastSession, ga:browser, ga:sessionDurationBucket',
    'start-date': '365daysAgo',
    'end-date': 'yesterday',
    'sort': '-ga:sessions',
    'max-results': 1000,
    'start-index': y
 */
