// #docplaster
// #docregion
import { ModuleWithProviders }  from '@angular/core';
// #docregion import-router
import { Routes, RouterModule } from '@angular/router';
// #enddocregion import-router

import { loginRoutes,
         authProviders }      from './login.routing';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
// #docregion can-load-guard
import { AuthGuard }          from './auth-guard.service';
// #enddocregion can-load-guard

// #docregion lazy-load-admin, can-load-guard

const adminRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
// #enddocregion lazy-load-admin
    canLoad: [AuthGuard]
// #docregion lazy-load-admin
  }
];
// #enddocregion can-load-guard

const appRoutes: Routes = [
  ...loginRoutes,
  ...adminRoutes
];
// #enddocregion lazy-load-admin

export const appRoutingProviders: any[] = [
  authProviders,
  CanDeactivateGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
