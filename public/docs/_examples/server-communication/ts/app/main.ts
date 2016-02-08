//#docregion
import {bootstrap}         from 'angular2/platform/browser';

// #docregion import-rxjs
// Add all operators to Observable
import 'rxjs/Rx';
// #enddocregion import-rxjs

import {WikiComponent}        from './wiki/wiki.component';
import {WikiSmartComponent} from './wiki/wiki-smart.component';
import {TohComponent}         from './toh/toh.component';

bootstrap(WikiComponent);
bootstrap(WikiSmartComponent);
bootstrap(TohComponent);