// #docregion
import { provideRouter, RouterConfig }  from '@angular/router';

import { CrisisCenterRoutes } from './crisis-center/crisis-center.routes';
import { HeroesRoutes }       from './heroes/heroes.routes';

export const routes: RouterConfig = [
  ...HeroesRoutes,
  ...CrisisCenterRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
