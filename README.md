## FJCC Core Reporting
  # Kinda WORKING!

> Purpose of this product is to have qualified quantifiable data showing that site engagement(S/T) over time(KPI) teacher assessment scores were positively impacted

###OR

> Purpose of this product is to "Predict" teacher assessment scores based on data collected showing site engagement(S/T) over time(KPI)


### Directory Layout

```
.
├── /build/
├── /node_modules/
├── /core/
│   ├── /actions/
│   ├── /api/
│   ├── /components/
│   ├── /constants/
│   ├── /content/
│   ├── /dispatch/
│   ├── /decorators/
│   ├── /public/
│   ├── /stores/
│   ├── /utils/
│   ├── /app.js
│   ├── /config.js
│   ├── /routes.js
│   └── /server.js
├── /tools/
│   ├── /lib/
│   ├── /build.js
│   ├── /bundle.js
│   ├── /clean.js
│   ├── /config.js
│   ├── /copy.js
│   ├── /deploy.js
│   ├── /serve.js         # Set Enviroment to Server & initialize
│   └── /start.js         # BrowserSync, Webpack, build, start server
│── .babelrc              # Possibly not needed
│── .csscomb.json         # Config
│── .csslintrc            # Config
│── .editorconfig         # Sublime Config
│── .flowconfig           # Specify order of operations for compiling
│── .gitattributes        # Git config
│── .gitignore            # Git config
│── .jscsrc               # JSCS process config
│── .travis.yml           # Travis CL environment setup for testing
│── CHANGELOG.md          # Notable Changes 
│── citizenUsers.sh       # Imports/Snapshot of FloridaCitizen user data to local
│── config.yml            # FloridaCitizen database Config 
│── googleImport.js       # Import GATC into User dataTable 30,180,365 days 
│── LICENSE.txt           # License
│── loufreyinstitute.json # GATC service authentication file
│── nodemon.json          # Nodemon environment setup
│── package.json          # Package file
│── README.md             # READ ME 
└── preprocessor.js       # Babel processing for Biuld

```

### How to Test

Run unit tests powered by [Jest](https://facebook.github.io/jest/) with the following
[npm](https://www.npmjs.org/doc/misc/npm-scripts.html) command:

```shell
$ npm test
``` 
Test any javascript module by creating a `__tests__/` directory where
the file is. Append `-test.js` to the filename and [Jest](https://facebook.github.io/jest/) will do the rest.

### How to manually pull data
> ./citizenUsers pull

> node googleImport.js

#Analytics

###Purpose / Pseudo Code
  Nightly
    Connect to GA => import into local mongodb/ga
    Connect ot Citizens db => copy user db => local mongodb/citizen
  ** NOT going to merge data because of flexibility and speed

Example: 
> (Page Views: +1, Sessions: +4, unique Events +6) / Total Time on Site in minutes +5

> (1 + 4 + 6)/5 = 2.2

Quaility of engagment score = +2.2

> Not all dimensions and metrics can be queried together. Only certain dimensions and metrics can be used together to create valid combinations.
This is a condensed list of possible tracking dimensions / metrics 

```
User Dimensions
  userType                  = A boolean indicating if a user is new or returning. 
  sessionCount              = The session index for a user
  daysSinceLastSession      = The number of days elapsed since users last visited your property
  userDefinedValue          = The value provided when you define custom user segments for your property
User Metrics
  users                     = The total number of users for the requested time period
  newUsers                  = The number of users whose session was marked as a first-time session
  7dayUsers                 = Total number of 7-day active users for each day in the requested time period. At least one of ga:nthDay, ga:date, or ga:day must be specified as a dimension in order to query this metric
  sessionsPerUser           = The total number of sessions divided by the total number of users
  percentNewSessions        = The percentage of sessions by people who had never visited your property before

Session Dimensions
  sessionDurationBucket     = The total number of sessions
Session Metrics
  sessions                  = The total number of sessions
  bounces                   = The total number of single page (or single engagement hit) sessions for your property
  sessionDuration           = The total duration of user sessions represented in total seconds
  hits                      = Total number of hits sent to Google Analytics. This metric sums all hit types (e.g. pageview, event, timing, etc.)
  bounceRate                = The percentage of single-page session (i.e., session in which the person left your property from the first page) bounces/sessions
  avgSessionDuration        = The average duration of user sessions represented in total seconds sessionDuration/sessions

Geo Network Dimensions
  region                    = Geographical IDs. In the U.S., a region is a state, such as New York
  metro                     = The Designated Market Area (DMA) from where traffic arrived
  city                      = The cities of users, derived from IP addresses or Geographical IDs
  latitude                  = The approximate latitude of the user's city
  longitude                 = The approximate longitude of the user's city
  networkDomain             = The domain name of the ISPs used by users
  networkLocation           = The name of service providers used to reach your property
  cityId                    = The city IDs of users, derived from IP addresses or Geographical IDs.
  countryIsoCode            = The country ISO code of users, derived from IP addresses or Geographical IDs
  regionId                  = Geographical IDs. In the U.S., a region is a state, such as New York
  regionIsoCode             = The region ISO code of users, derived from IP addresses or Geographical IDs.

Event Dimensions
  eventCategory             = The category of the event
  eventAction               = The action of the event
  eventLabel                = The label of the event 
Event Metrics
  totalEvents               = The total number of events for the profile, across all categories
  uniqueEvents              = The total number of unique events for the profile, across all categories
  eventValue                = The total value of events for the profile
  sessionsWithEvent         = The total number of sessions with events
  avgEventValue             = The average value of an event eventValue/totalEvents
  eventsPerSessionWithEvent = The average number of events per session with event totalEvents/sessionsWithEvent

Custom Variable Dimensions
  dimension1                = guid, user id generated on Citizen and passed to analytics
  dimension2                = school district(county)
Custom Variable Metrics
  metricxx                  = The name of the requested custom metric, where XX refers the number/index of the custom metric INTEGER, CURRENCY or TIME

Page Tracking Dimensions
  landingPagePath           = The first page in a user's session, or landing page.
  exitPagePath              = The last page in a user's session, or exit page.
  pageDepth                 = The number of pages visited by users during a session
Page Tracking Metrics
  pageValue                 = The average value of this page or set of pages. Page Value is (ga:transactionRevenue + ga:goalValueAll) / ga:uniquePageviews
  pageviews                 = The total number of pageviews for your page property
  uniquePageviews           = The number of different (unique) pages within a session
  timeOnPage                = How long a user spent on a particular page in seconds
  pageviewsPerSession       = The average number of pages viewed during a session, including repeated views of a single page. pageviews/sessions
  avgTimeOnPage             = The average amount of time users spent viewing this page or a set of pages. timeOnPage / (pageviews - exits)
  exitRate                  = The percentage of exits from your property that occurred out of the total page views. exits / (pageviews + screenviews)
```


####GA format
```json
{
   "dimension1" : "NyGqTX62o",
   "dimension2" : "Pinellas",
   "sessions" : "1",
   "sessionsPerUser" : "1.0",
   "timeOnPage" : "8.0",
   "city" : "Dunedin",
   "regionId" : "21142",
   "daysSinceLastSession" : "2",
   "browser" : "Chrome",
   "uniqueEvents" : "30"
}
```
###Citizen format
```json
{ 
 "_id" : "1kbFaYpAj",
 "_gid" : "NyGqTX62o",
 "email" : "email@email.com",
 "password" : "###",
 "role" : "user",
 "created_at" : ISODate("2012-04-06T17:39:53Z"), "country" : "United States",
 "state" : "Florida",
 "district" : "Other or No School District",
 "position" : "other",
 "grade" : "Other",
 "subject" : "Other",
 "class_size" : 0, "ap" : false, "ib" : false, "de" : false, "legacy" : true
}
```
