// #docplaster
// #docregion , v3
import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent }   from './not-found.component';

const appRoutes: Routes = [
// #enddocregion v3
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'modal'
  },
// #docregion v3
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
