import { NgModule }            from '@angular/core';

import { SharedModule }        from '../shared/shared.module';

import { HeroListComponent }   from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService }         from './hero.service';
import { routing }             from './hero.routing';

@NgModule({
  imports:      [ SharedModule, routing ],
  declarations: [ HeroDetailComponent, HeroListComponent],
  providers:    [ HeroService ]
})
export class HeroModule { }
