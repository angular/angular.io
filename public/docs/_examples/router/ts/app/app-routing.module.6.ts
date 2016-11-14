// #docplaster
// #docregion, preload-v1
import { NgModule }     from '@angular/core';
import {
  RouterModule, Routes,
// #enddocregion preload-v1
  PreloadAllModules
// #docregion preload-v1
} from '@angular/router';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard }          from './auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  {
    path: 'crisis-center',
    loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
      // #enddocregion preload-v1
      , { preloadingStrategy: PreloadAllModules }
      // #docregion preload-v1
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class AppRoutingModule {}
