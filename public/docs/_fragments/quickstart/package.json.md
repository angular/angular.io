```
{
  "name": "ng2-quickstart",
  "version": "0.0.1",
  "license": "ICS",
  "repository": {},
  "dependencies": {
    "angular2": "2.0.0-alpha.35",
    "es6-module-loader": "^0.16",
    "systemjs": "^0.16",
    "traceur": "0.0.91"
  },
  "devDependencies": {
    "jasmine-core": "^2.3.4",
    "zone.js": "^0.5.3"
  },
  "scripts": {
    "postinstall": "cd src && tsd reinstall -r -o && cd ..",
    "tsc": "tsc -p src -w",
    "start": "live-server"
  }
}
```