// #docplaster
// #docregion
import { provideRouter }       from '@angular/router';

import { CrisisListComponent } from './crisis-center/crisis-list.component';
import { HeroesRoutes }        from './heroes/heroes.routes';

export const routes = [
  ...HeroesRoutes,
  { path: '/crisis-center', component: CrisisListComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
