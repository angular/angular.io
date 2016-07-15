'use strict';

// This file is likely outdated.
// To run, cd to this dir and
//   node test.js

const path = require('canonical-path');
const Dgeni = require('dgeni');
const dartPkg = require(path.resolve('.'));

const ANGULAR_IO_PROJECT_PATH = '../../..';
const DOCS_PATH = path.join(ANGULAR_IO_PROJECT_PATH, 'public/docs');
const apiDocPath = path.join(DOCS_PATH, 'dart/latest/api');

dartPkg.config(function (dartPkgConfigInfo) {
    dartPkgConfigInfo.ngIoDartApiDocPath = apiDocPath;
    dartPkgConfigInfo.ngDartDocPath = path.join(ANGULAR_IO_PROJECT_PATH, '../ngdart/doc/api');
});

const dgeni = new Dgeni([dartPkg]);

dgeni.generate().catch(function (err) {
    console.log(err);
    console.log(err.stack);
    throw err;
});
