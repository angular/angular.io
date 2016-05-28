// Imports for loading & configuring the in-memory web api
import { ConnectionBackend, XHRBackend } from '@angular/http';

import { InMemoryBackendService,
         SEED_DATA }  from 'angular2-in-memory-web-api';
import { HeroData }   from './hero-data';

// The usual bootstrapping imports
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }   from './app.component';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA,  useClass: HeroData },               // in-mem server data
    { provide: ConnectionBackend, useExisting: XHRBackend }    // Http depends on ConnectionBackend
]);
