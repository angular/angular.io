import { Component } from '@angular/core';

import { HeroListComponent } from './heroes/hero-list/hero-list.component';

@Component({
  selector: 'sg-app',
  template: '<toh-hero-list></toh-hero-list>',
  directives: [HeroListComponent]
})
export class AppComponent { }
