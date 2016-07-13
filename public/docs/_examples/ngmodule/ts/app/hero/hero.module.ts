import { NgModule }           from '@angular/core';

import { SharedModule }       from '../shared/shared.module';

import { HeroComponent }      from './hero.component';
import { HeroDetailComponent }         from './hero-detail.component';
import { HeroListComponent }           from './hero-list.component';
import { routing }            from './hero.routing';

/*
 * TODO: Remove THE HeroService class and provider after
 * https://github.com/angular/angular/pull/10579 lands
 */
import { HeroService } from './hero.service';

@NgModule({
  imports: [ SharedModule, routing ],
  providers: [ HeroService ],
  declarations: [
    HeroComponent, HeroDetailComponent, HeroListComponent,
  ]
})
export default class HeroModule { }
