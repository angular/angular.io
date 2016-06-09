// #docregion
import { RouterConfig }               from '@angular/router';
import { CrisisCenterRoutes }         from './crisis-center/crisis-center.routes';
import { HeroesRoutes }               from './heroes/heroes.routes';

export const routes: RouterConfig = [
  ...CrisisCenterRoutes,
  ...HeroesRoutes
];
