// #docregion
import {bootstrap} from 'angular2/angular2';
import {AppComponent} from './app.component';
// #docregion import-hero-service
import {HeroService} from './hero.service';
// #enddocregion import-hero-service
bootstrap(AppComponent, [HeroService]);
// #enddocregion

// #docregion import-router
import {Router} from 'angular2/router';
import {Routes} from './route.config';
// #enddocregion import-router