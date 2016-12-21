// #docplaster
// #docregion
import { NgModule }     from '@angular/core';
// #docregion import-router
import { RouterModule, Routes } from '@angular/router';
// #enddocregion import-router

import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent }   from './not-found.component';

import { CanDeactivateGuard }      from './can-deactivate-guard.service';
// #docregion can-load-guard
import { AuthGuard }               from './auth-guard.service';
// #enddocregion can-load-guard

// #docregion lazy-load-admin, can-load-guard

const appRoutes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
// #enddocregion lazy-load-admin
    canLoad: [AuthGuard]
// #docregion lazy-load-admin
  },
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class AppRoutingModule {}
