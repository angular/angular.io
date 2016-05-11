// #docregion
// #docregion importbootstrap
import { provide } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { Phones } from './core/phones.service';
import AppComponent from './app.component';
// #enddocregion importbootstrap

// #docregion http-import
import { HTTP_PROVIDERS } from '@angular/http';
// #enddocregion http-import

// #docregion bootstrap
bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  Phones
]);
// #enddocregion bootstrap
