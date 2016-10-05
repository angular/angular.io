// #docplaster
// #docregion
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrisisListComponent }  from './crisis-list.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'crisis-center', component: CrisisListComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
