```
{
  "name": "getting-started",
  "version": "0.0.1",
  "dependencies": {
    "angular2": "2.0.0-alpha.37",
    "systemjs": "^0.18.17",
    "traceur": "0.0.91"
  },
  "scripts": {
    "postinstall": "cd src && tsd reinstall -r -o && cd ..",
    "tsc": "tsc -p src -w",
    "start": "live-server --open=src"
  }
}

```