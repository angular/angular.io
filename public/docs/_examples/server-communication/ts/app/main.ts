// #docplaster
// #docregion
import { bootstrap }      from '@angular/platform-browser-dynamic';
// #docregion http-providers
import { HTTP_PROVIDERS } from '@angular/http';
// #enddocregion http-providers

// #docregion import-rxjs
// Add all operators to Observable
import 'rxjs/Rx';
// #enddocregion import-rxjs

import { TohComponent }       from './toh/toh.component';
import { WikiComponent }      from './wiki/wiki.component';
import { WikiSmartComponent } from './wiki/wiki-smart.component';

// #docregion http-providers
bootstrap(TohComponent, [HTTP_PROVIDERS]);
// #enddocregion http-providers
bootstrap(WikiComponent);
bootstrap(WikiSmartComponent);
