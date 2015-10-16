## FJCC Core Reporting
  # NOT WORKING!

### Directory Layout

```
.
├── /build/
├── /docs/
├── /node_modules/
├── /src/
│   ├── /actions/   
│   ├── /api/       
│   ├── /components/
│   ├── /constants/ 
│   ├── /content/   
│   ├── /core/      
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

### Purpose / Pseudo Code
Log in => 
  Connect to GA => import into local mongodb/ga
  Connect ot Citizens db => dump user db => local mongodb/citizen
  ** NOT going to merge

GA format: 
Citizen format:
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
