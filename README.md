# Angular.io
[![Build Status][travis-badge]][travis-badge-url]

Angular.io is site for Angular **documentation** . 

This site also includes links to other helpful angular resources including 
AngularJS, Angular Material, and AngularFire.

## Issues

Please file **Developer Guide, Cookbook, and code sample issues _only_** in this 
[Angular.io](https://github.com/angular/angular.io/issues) github repo.

**Angular API issues, cheatsheet corrections, feature requests, defect reports, and technical questions** concerning Angular itself
belong in the [**angular source code**](https://github.com/angular/angular/issues) github repo.
We can't handle those topics here and will ask you to re-post them on the angular repo.

## How you can help

Filing issues is helpful but **pull requests** that improve the docs are even better!

Learn how to [contribute to Angular.io](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md).

## Development Setup
This site relies heavily on node and npm.

1. Make sure you are using at least node v.5+ and latest npm; 
if not install [nvm](https://github.com/creationix/nvm) to get node going on your machine.

1. Install global npm packages by running `./scripts/before-install.sh`

1. Clone

  - this repo
  - [angular/angular source code repo](https://github.com/angular/angular)

  to the same parent directory. The **cloned repo directories must be siblings**, with the latter named **angular**.

1. cd into root directory `angular.io/`

1. Install local npm packages by running `./scripts/install.sh`

1. See [below](#code-sample-development) for code sample development preparation.

## Content Development
All documentation content is written in Jade which has [its own syntax](http://jade-lang.com/reference/).
Be aware of the strict demands imposed by this significant-whitespace language.
We strongly recommend running one of the gulp `serve-and-sync` commands [described below](#serve-and-sync)
while editing content so you can see the effect of your changes *as you type*.

The documentation relies on specific styles and mixins. 
Learn about those in the [documentation styleguide](https://v2.angular.io/docs/ts/latest/styleguide.html).

The jade documentation files are language-specific directories under either `public/docs/`.
For example, all of the TypeScript docs are in `public/docs/ts/latest`, e.g.
- `public/docs/ts/latest/quickstart.jade`
- `public/docs/ts/latest/guide/architecture.jade`
- `public/docs/ts/latest/cookbook/component-communication.jade`
- `public/docs/ts/latest/tutorial/toh-pt5.jade`

### Local server with watches and browser reload
 1. cd into root directory `angular.io/`
 1. run `gulp serve-and-sync`
 1. browser will launch on localhost:3000 and stay refreshed automatically.

<a id="serve-and-sync"></a>
If you are only going to work on a specific part of the docs, such as the dev guide, then you can use one of the more specific gulp tasks to only watch those parts of the file system:

* `gulp serve-and-sync` : watch all the local Jade/Sass files, the API source and examples, and the dev guide files
* `gulp serve-and-sync-api` : watch only the API source and example files
* `gulp serve-and-sync-devguide` : watch only the dev guide files
* `gulp build-and-serve` : watch only the local Jade/Sass files

## Code Sample Development

All documentation is supported by sample code and plunkers. 
Such code resides in the `public/docs/_examples` directory, under page-specific directories, further divided by language track.

For example, the TypeScript QuickStart sample is in `public/docs/_examples/quickstart/ts`.

All samples are in a consistent directory structure using the same styles and the same npm packages, including the latest release of Angular.
This consistency is possible in part thanks to gulp-driven tooling. 
To run the samples locally and confirm that they work properly, 
take the following extra steps to prepare the environment:

1. cd to `public/docs/_examples`

1. install the canonical node packages for all samples by running `npm install`

1. cd back up to `angular.io` root: `cd ../../..`

1. run `gulp add-example-boilerplate` (elevate to admin on Windows) 
to copy canonical files to the sample directories and create symlinks there for node_modules. 

Now cd into any particular sample's language directory (e.g., `public/docs/_examples/quickstart/ts`) and try:
- `npm start`  to simultaneously compile-with-watch and serve-in-browser-with-watch
- `npm run tsc` to compile only
- `npm run lite` to serve-and-watch in browser

Look at the scripts in `package.json` for other options.
Also, open any `plunkr.no-link.html` to see the code execute in plunker
(you may have to run `gulp build-plunkers` first to create/update).

You must check that your example is free of lint errors.
- `gulp lint`

### Sample end-to-end tests

All samples should be covered to some degree by end-to-end tests:
- `gulp run-e2e-tests` to run all TypeScript and JavaScript tests
- `gulp run-e2e-tests --lang=all` to run TypeScript and JavaScript tests
- `gulp run-e2e-tests --filter=quickstart` to filter the examples to run, by name
- `gulp run-e2e-tests --fast` to ignore npm install, webdriver update and boilerplate copy

Any combination of options is possible.

### Resetting the project
This project generates a lot of untracked files, if you wish to reset it to a mint state, you can run:

- `git clean -xdf`

Also, there is a script available for Linux, OSX and Windows Gitbash users that will setup the project using the steps shown in this section:

- `./scripts/install.sh`

### Run with current build instead of release packages
Can switch the `@angular` packages in `~/public/docs/_examples/node_modules` to the current build packages with
```
gulp install-example-angular --build
```
Restore to RELEASE packages with
```
gulp install-example-angular
```
>These commands will fail if something is locking any of the packages ... as an IDE often does.
>
>The symptom typically is an error trying to `rm -rf node_modules/@angular`.
>
>_Solution_: unlock the hold on the package(s). In VS Code, re-load the window (`cmd-P` then enter `>relow`).


## Technology Used
- Angular: Current Angular
- AngularJS: A v.1.x version of Angular 
- Angular Material: An implementation of Material Design in Angular.js
- Gulp: node-based tooling
- Harp: The static web server with built-in preprocessing.
- Sass: A professional grade CSS extension language
- Normalize: A modern, HTML5-ready alternative to CSS resets
- Grids: A highly customizable CSS Grid Framework built with Sass
- Prettify: A JS module and CSS for syntax highlighting of source code snippets.
- Icomoon: Custom built icon fonts


## License
Powered by Google ©2010-2017. Code licensed under an [MIT-style License](https://github.com/angular/angular.io/tree/v2/tree/v2/blob/master/LICENSE). Documentation licensed under [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/).

[travis-badge]: https://travis-ci.org/angular/angular.io.svg?branch=master
[travis-badge-url]: https://travis-ci.org/angular/angular.io
