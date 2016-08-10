// #docregion
// #docregion import-router
import { Routes, RouterModule }   from '@angular/router';
// #enddocregion import-router

import { loginRoutes,
         authProviders }  from './login.routing';

import { CanDeactivateGuard } from './can-deactivate-guard.service';

// #docregion lazy-load-crisis-center
const crisisCenterRoutes: Routes = [
  {
    path: '',
    redirectTo: '/crisis-center',
    pathMatch: 'full'
  },
  {
    path: 'crisis-center',
    loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule'
  }
];

const appRoutes: Routes = [
  ...loginRoutes,
  ...crisisCenterRoutes
];
// #enddocregion lazy-load-crisis-center

export const appRoutingProviders: any[] = [
  authProviders,
  CanDeactivateGuard
];

export const routing = RouterModule.forRoot(appRoutes);
// #enddocregion

/* A link parameters array
// #docregion heroes-redirect
{
  path: '',
  redirectTo: '/heroes',
  pathMatch: 'full'
},
// #enddocregion heroes-redirect
*/
