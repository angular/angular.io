// #docregion
import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { loginRoutes,
         authProviders }      from './login.routing';

const appRoutes: Routes = [
  ...loginRoutes
];

export const appRoutingProviders: any[] = [
  authProviders
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
