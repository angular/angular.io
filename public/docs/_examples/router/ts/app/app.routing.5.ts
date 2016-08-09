// #docregion
import { Routes, RouterModule }  from '@angular/router';

import { loginRoutes,
         authProviders }      from './login.routing';

const appRoutes: Routes = [
  ...loginRoutes
];

export const appRoutingProviders: any[] = [
  authProviders
];

export const routing = RouterModule.forRoot(appRoutes);
