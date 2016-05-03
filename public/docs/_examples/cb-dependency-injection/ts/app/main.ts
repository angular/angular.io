// #docregion
import { bootstrap }        from '@angular/platform-browser-dynamic';
import { provide }          from '@angular/core';
import { XHRBackend }       from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { LocationStrategy,
         HashLocationStrategy } from '@angular/common';

import { HeroData }         from './hero-data';
import { InMemoryBackendService,
         SEED_DATA }        from 'angular2-in-memory-web-api/core';

import { AppComponent }     from './app.component';

// #docregion bootstrap
bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy,
         {useClass: HashLocationStrategy}),

  provide(XHRBackend, { useClass: InMemoryBackendService }), // in-mem server
  provide(SEED_DATA,  { useClass: HeroData }) // in-mem server data
]).catch((err: any) => console.error(err));
// #enddocregion bootstrap
