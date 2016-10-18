// #docplaster
// #docregion final
// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService }               from './in-memory-data.service';

// The usual bootstrapping imports
// #docregion v1
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }         from './app.component';
import { appRouterProviders }   from './app.routes';

// #enddocregion v1, final
/*
// #docregion v1
bootstrap(AppComponent, [
  appRouterProviders,
  HTTP_PROVIDERS
]);
// #enddocregion v1
*/
// #docregion final
bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS,
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA, useClass: InMemoryDataService }      // in-mem server data
]);
// #enddocregion final
