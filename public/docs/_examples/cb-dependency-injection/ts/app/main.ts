// #docregion
import { bootstrap }        from 'angular2/platform/browser';
import { provide }          from 'angular2/core';
import { XHRBackend }       from 'angular2/http';

import { LocationStrategy,
         HashLocationStrategy,
         ROUTER_PROVIDERS } from 'angular2/router';

import { HeroData }         from './hero-data';
import { InMemoryBackendService,
         SEED_DATA }        from 'a2-in-memory-web-api/core';

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
