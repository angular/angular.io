import {bootstrap} from 'angular2/platform/browser';
import {BackendService} from './backend.service';
import {HeroService} from './hero.service';
import {Logger} from './logger.service';
import {HeroListComponent} from './hero-list.component';

// #docregion bootstrap
bootstrap(HeroListComponent, [
  BackendService, HeroService, Logger
]);
// #enddocregion bootstrap
