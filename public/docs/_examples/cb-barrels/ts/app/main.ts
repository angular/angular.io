// #docregion imports
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HeroService } from './heroes';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [
// #enddocregion
  ROUTER_PROVIDERS,
  HeroService
]);
