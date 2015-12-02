import {bootstrap, provide} from 'angular2/angular2';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HeroService} from './hero.service';
import {AppComponent} from './app.component';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HeroService
]);
