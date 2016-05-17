// #docplaster
// #docregion
import { bootstrap }      from '@angular/platform-browser-dynamic';
// #docregion http-providers
import { HTTP_PROVIDERS } from '@angular/http';
// #enddocregion http-providers

// #docregion import-rxjs
// Add the RxJS Observable operators we need in this app.
import './add-rxjs-operators';
// #enddocregion import-rxjs

import { TohComponent }       from './toh/toh.component';
import { WikiComponent }      from './wiki/wiki.component';
import { WikiSmartComponent } from './wiki/wiki-smart.component';

// #docregion http-providers
bootstrap(TohComponent, [HTTP_PROVIDERS]);
// #enddocregion http-providers
bootstrap(WikiComponent);
bootstrap(WikiSmartComponent);
