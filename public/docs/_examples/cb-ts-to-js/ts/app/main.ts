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
import { HeroComponent }
  from './hero.component';
// #enddocregion appimport
import { HeroComponent as HeroLifecycleComponent } from './hero-lifecycle.component';
import { HeroComponent as HeroDIComponent } from './hero-di.component';
import { HeroComponent as HeroDIInjectComponent } from './hero-di-inject.component';
import { AppComponent as AppDIInjectAdditionalComponent } from './hero-di-inject-additional.component';
import { AppComponent as AppIOComponent } from './hero-io.component';
import { HeroesComponent as HeroesHostBindingsComponent } from './heroes-bindings.component';
import { HeroesQueriesComponent } from './heroes-queries.component';

import { DataService } from './data.service';

bootstrap(HeroComponent);
bootstrap(HeroLifecycleComponent);
bootstrap(HeroDIComponent, [DataService]);
bootstrap(HeroDIInjectComponent, [
  { provide: 'heroName', useValue: 'Windstorm' }
]);
bootstrap(AppDIInjectAdditionalComponent);
bootstrap(AppIOComponent);
bootstrap(HeroesHostBindingsComponent);
bootstrap(HeroesQueriesComponent);
