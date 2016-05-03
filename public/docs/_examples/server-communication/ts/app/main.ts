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

import { WikiComponent }      from './wiki/wiki.component';
import { WikiSmartComponent } from './wiki/wiki-smart.component';
import { TohComponent }       from './toh/toh.component';

bootstrap(WikiComponent);
bootstrap(WikiSmartComponent);
// #docregion http-providers
bootstrap(TohComponent, [HTTP_PROVIDERS]);
// #enddocregion http-providers
