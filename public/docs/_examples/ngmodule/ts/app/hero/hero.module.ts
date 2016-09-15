import { NgModule }            from '@angular/core';

import { SharedModule }        from '../shared/shared.module';

import { HeroComponent }       from './hero.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroListComponent }   from './hero-list.component';
import { routing }             from './hero.routing';

@NgModule({
  imports: [ SharedModule, routing ],
  declarations: [
    HeroComponent, HeroDetailComponent, HeroListComponent,
  ]
})
export class HeroModule { }
