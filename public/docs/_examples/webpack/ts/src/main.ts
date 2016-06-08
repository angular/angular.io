// #docregion
import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppComponent } from './app/app.component';

// #docregion enable-prod
if (process.env.ENV === 'production') {
  enableProdMode();
}
// #enddocregion enable-prod

bootstrap(AppComponent, []);
// #enddocregion
