# Angular.io
Angular.io is currently the preview site for Angular 2. This site also includes links to other helpful angular resources including Angular 1, Angular Material, and AngularFire.

## How you can help
- [File an issue on github](https://github.com/angular/angular.io/issues)
- [Contribute to Angular.io](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md)


## Development Setup
1. Install version 0.17 of [Harp](http://harpjs.com/) (This is the current harp version.)
2. cd into root directory `angular.io/`
3. run `harp server`
4. Open this url in the browser: [http://localhost:9000/](http://localhost:9000/)

## Development setup with watches
 1. cd into root directory `angular.io/`
 2. run `gulp serve-and-watch`
 3. Open this url in the browser: [http://localhost:9000/](http://localhost:9000/)
 4. Refresh your browser to see any changes.

## Development setup with watches and browser reload
 1. cd into root directory `angular.io/`
 2. install `browser-sync`

    `npm install -g browser-sync`<br/>

       *or on Windows*<br/>

    `npm install -g browser-sync --msvs_version=2013`

 3. run `gulp serve-and-sync`
 4. browser will launch ( on localhost:3000 instead of localhost:9000) and stay refreshed automatically.

## Technology Used
- Angular 1.x: The production ready version of Angular
- Angular Material: An implementation of Material Design in Angular.js
- Harp: The static web server with built-in preprocessing.
- Sass: A professional grade CSS extension language
- Normalize: A modern, HTML5-ready alternative to CSS resets
- Grids: A highly customizable CSS Grid Framework built with Sass
- Prettify: A JS module and CSS for syntax highlighting of source code snippets.
- Icomoon: Custom built icon fonts


## License
Powered by Google ©2010-2015. Code licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0). Documentation licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/).
