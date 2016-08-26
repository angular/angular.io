import { NgModule }            from '@angular/core';

import { SharedModule }        from '../shared/shared.module';

import { HeroComponent }       from './hero.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroListComponent }   from './hero-list.component';
import { routing }             from './hero.routing';

// TODO: Remove THE HeroService class in RC 6
import { HeroService } from './hero.service';

@NgModule({
  imports: [ SharedModule, routing ],
  // TODO: Remove in RC 6
  providers: [ HeroService ],
  declarations: [
    HeroComponent, HeroDetailComponent, HeroListComponent,
  ]
})
export class HeroModule { }
