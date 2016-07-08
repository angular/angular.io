// #docregion
import { provideRouter, RouterConfig }  from '@angular/router';

import { crisisCenterRoutes } from './crisis-center/crisis-center.routes';
import { heroesRoutes }       from './heroes/heroes.routes';

export const routes: RouterConfig = [
  ...heroesRoutes,
  ...crisisCenterRoutes
];

export const appRouterProviders = [
  provideRouter(routes)
];
