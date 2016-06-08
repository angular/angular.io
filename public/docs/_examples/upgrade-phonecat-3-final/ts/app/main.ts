// #docregion
// #docregion imports
import {
  LocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF
} from '@angular/common';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Phone } from './core/phone/phone.service';
import { AppComponent } from './app.component';
// #enddocregion imports

// #docregion bootstrap
bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  { provide: APP_BASE_HREF, useValue: '!' },
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  Phone
]);
// #enddocregion bootstrap
