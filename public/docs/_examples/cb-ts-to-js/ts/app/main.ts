/* tslint:disable no-unused-variable */
// #docregion ng2import
import { bootstrap }
  from '@angular/platform-browser-dynamic';
import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
// #enddocregion ng2import

// #docregion appimport
import { HeroComponent } from './hero.component';
// #enddocregion appimport

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HeroesModule } from './hero.component';
import { HeroesLifecycleModule } from './hero-lifecycle.component';
import { HeroesDIModule } from './hero-di.component';
import { HeroesDIInjectModule } from './hero-di-inject.component';
import { HeroesDIInjectAdditionalModule } from './hero-di-inject-additional.component';
import { HeroesIOModule } from './hero-io.component';
import { HeroesHostBindingsModule } from './heroes-bindings.component';
import { HeroesQueriesModule } from './heroes-queries.component';

platformBrowserDynamic().bootstrapModule(HeroesModule);
platformBrowserDynamic().bootstrapModule(HeroesLifecycleModule);
platformBrowserDynamic().bootstrapModule(HeroesDIModule);
platformBrowserDynamic().bootstrapModule(HeroesDIInjectModule);
platformBrowserDynamic().bootstrapModule(HeroesDIInjectAdditionalModule);
platformBrowserDynamic().bootstrapModule(HeroesIOModule);
platformBrowserDynamic().bootstrapModule(HeroesHostBindingsModule);
platformBrowserDynamic().bootstrapModule(HeroesQueriesModule);
