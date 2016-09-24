// #docregion
// #docregion imports
import {
  LocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF
} from '@angular/common';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { Phone } from './core/phone/phone.service';
import { AppComponent } from './app.component';

import { appRouterProviders } from './app.routes';
// #enddocregion imports

// #docregion bootstrap
bootstrap(AppComponent, {
  imports: [FormsModule],
  providers: [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    { provide: APP_BASE_HREF, useValue: '!' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    Phone
  ]
});
// #enddocregion bootstrap
