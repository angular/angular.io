// #docregion
import { ModuleWithProviders } from '@angular/core';
// #docregion import-router
import { Routes, RouterModule }   from '@angular/router';
// #enddocregion import-router

import { loginRoutes,
         authProviders }  from './login.routing';

import { CanDeactivateGuard } from './can-deactivate-guard.service';

const appRoutes: Routes = [
  ...loginRoutes
];

export const appRoutingProviders: any[] = [
  authProviders,
  CanDeactivateGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
