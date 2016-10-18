import { Component } from '@angular/core';

import { HeroesComponent } from './heroes';

@Component({
  selector: 'sg-app',
  template: '<toh-heroes></toh-heroes>',
  directives: [HeroesComponent]
})
export class AppComponent { }
