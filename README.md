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
│   ├── /serve.js   
│   └── /start.js 
│── package.json
└── preprocessor.js
```

### How to Test

Run unit tests powered by [Jest](https://facebook.github.io/jest/) with the following
[npm](https://www.npmjs.org/doc/misc/npm-scripts.html) command:

```shell
$ npm test
```

Test any javascript module by creating a `__tests__/` directory where
the file is. Append `-test.js` to the filename and [Jest](https://facebook.github.io/jest/) will do the rest.

###Purpose / Pseudo Code
  Nightly
    Connect to GA => import into local mongodb/ga
    Connect ot Citizens db => copy user db => local mongodb/citizen
  ** NOT going to merge data because of flexibility and speed


Give metric values to Page Views/ Time on Page/ Sessions/ Unique Events

Example: 
> (Page Views: +1, Sessions: +4, unique Events +6) / Total Time on Site in minutes +5
> (1 + 4 + 6)/5 = 2.2

Quaility of engagment score = +2.2

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
