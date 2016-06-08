import { Component } from '@angular/core';

import { HeroListComponent } from './heroes';

@Component({
  selector: 'sg-app',
  template: '<toh-hero-list></toh-hero-list>',
  directives: [HeroListComponent]
})
export class AppComponent { }
