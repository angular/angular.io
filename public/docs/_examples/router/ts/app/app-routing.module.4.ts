// #docplaster
// #docregion
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent }from './not-found.component';

import { CanDeactivateGuard } from './can-deactivate-guard.service';

const appRoutes: Routes = [
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
