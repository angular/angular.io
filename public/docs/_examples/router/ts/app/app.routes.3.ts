// #docplaster
// #docregion
// #enddocregion
/*
// Apparent Milestone 2 imports
// #docregion
import { RouterConfig }          from '@angular/router';
import { CrisisListComponent }   from './crisis-list.component';
// #docregion hero-import
import { HeroesRoutes } from './heroes/heroes.routes';
// #enddocregion hero-import

export const routes: RouterConfig = [
  { path: '/crisis-center', component: CrisisListComponent },
  ...HeroesRoutes
];
// #enddocregion
*/
import { CrisisListComponent } from './crisis-center/crisis-list.component';

// #docregion route-config
import { HeroesRoutes } from './heroes/heroes.routes';

export const routes = [
  { path: '/crisis-center', component: CrisisListComponent },
  ...HeroesRoutes
];
// #enddocregion route-config
