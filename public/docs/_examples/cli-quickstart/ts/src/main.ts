// #docplaster
// #docregion important
import { bootstrap } from '@angular/platform-browser-dynamic';

// #enddocregion important
import { enableProdMode } from '@angular/core';
import { environment } from './app/';
// #docregion important
import { CliQuickstartAppComponent } from './app/';
// #enddocregion important
if (environment.production) {
  enableProdMode();
}

// #docregion important

bootstrap(CliQuickstartAppComponent);
// #enddocregion important
