import { Component } from '@angular/core';

import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import { HeroService } from './heroes/shared';

@Component({
  selector: 'sg-app',
  template: '<toh-hero-list></toh-hero-list>',
  directives: [HeroListComponent],
  providers: [HeroService]
})
export class AppComponent { }
