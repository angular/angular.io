import { Component } from '@angular/core';

import { HeroListComponent, HeroService } from './heroes';

@Component({
  selector: 'sg-app',
  template: '<toh-hero-list></toh-hero-list>',
  directives: [HeroListComponent],
  providers: [HeroService]
})
export class AppComponent { }
