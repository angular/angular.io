import { Component } from '@angular/core';

import { HeroButtonComponent } from './heroes';

@Component({
  selector: 'sg-app',
  template: '<toh-hero-button></toh-hero-button>',
  directives: [HeroButtonComponent]
})
export class AppComponent { }
