// #docregion
import { provideRouter, RouterConfig }  from '@angular/router';

import { CrisisCenterRoutes } from './crisis-center/crisis-center.routes';
import { HeroesRoutes }       from './heroes/heroes.routes';

import { LoginRoutes,
         AUTH_PROVIDERS }     from './login.routes';

export const routes: RouterConfig = [
  ...HeroesRoutes,
  ...LoginRoutes,
  ...CrisisCenterRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS
];
