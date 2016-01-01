# Angular.io
Angular.io is currently the preview site for Angular 2. This site also includes links to other helpful angular resources including Angular 1, Angular Material, and AngularFire.

## How you can help
- [File an issue on github](https://github.com/angular/angular.io/issues)
- [Contribute to Angular.io](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md)


## Development Setup
1. install [nvm](https://github.com/creationix/nvm)
2. clone this repo and [angular](https://github.com/angular/angular) on the same parent directory
3. cd into root directory `angular.io/`
4. make sure you are using the latest node and npm by running `nvm use 4`.
5. install local packages by running `npm install`

## Local server with watches and browser reload
 1. cd into root directory `angular.io/`
 2. run `gulp serve-and-sync`
 3. browser will launch on localhost:3000 and stay refreshed automatically.

If you are only going to work on a specific part of the docs, such as the API or dev guide, then you can use one of the more specific gulp tasks to only watch those parts of the file system:

* `serve-and-sync` : watch all the local Jade/Sass files, the API source and examples, and the dev guide files
* `serve-and-sync-api-docs` : watch only the API source and example files
* `serve-and-sync-devguide` : watch only the dev guide files
* `build-and-serve` : watch only the local Jade/Sass files

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
