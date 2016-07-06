import { bootstrap }        from '@angular/platform-browser-dynamic';
import { XHRBackend, HTTP_PROVIDERS } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import 'rxjs/add/operator/map';

import { appRouterProviders } from './app.routes';
import { HeroData } from './hero-data';
import { AppComponent }     from './app.component';

bootstrap(AppComponent, [
  appRouterProviders,
  HTTP_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: XHRBackend, useClass: InMemoryBackendService },
  { provide: SEED_DATA,  useClass: HeroData }
  ]);
