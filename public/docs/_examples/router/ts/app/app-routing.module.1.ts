// #docplaster
// #docregion
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrisisListComponent }  from './crisis-list.component';
import { HeroListComponent }    from './hero-list.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'crisis-center', component: CrisisListComponent },
      { path: 'heroes', component: HeroListComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
