```
{
  "name": "1st-tests",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "postinstall": "npm run tsd",
    "tsd": "tsd reinstall -r -o --config src/tsd.json",
    "tsc": "tsc -p src -w",
    "test": "live-server --open=src/1st-tests.html"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jasmine-core": "^2.3.4"
  }
}
```