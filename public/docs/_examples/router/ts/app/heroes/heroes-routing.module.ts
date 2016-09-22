// #docregion
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeroListComponent }    from './hero-list.component';
import { HeroDetailComponent }  from './hero-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'heroes',  component: HeroListComponent },
    // #docregion hero-detail-route
      { path: 'hero/:id', component: HeroDetailComponent }
    // #enddocregion hero-detail-route
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class HeroRoutingModule { }
// #enddocregion
