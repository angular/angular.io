//#docregion
import {bootstrap}         from 'angular2/platform/browser';

// #docregion import-rxjs
// Add all operators to Observable
import 'rxjs/Rx';
// #enddocregion import-rxjs

import {WikiComponent}     from './wiki/wiki.component';
import {WikiFormComponent} from './wiki/wiki-form.component';
import {TohComponent}      from './toh/toh.component';

bootstrap(WikiComponent);
bootstrap(WikiFormComponent);
bootstrap(TohComponent);