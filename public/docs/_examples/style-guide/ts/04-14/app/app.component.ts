import { Component } from '@angular/core';

import { HeroesComponent } from './heroes/heroes.component';

@Component({
  selector: 'sg-app',
  template: '<toh-heroes></toh-heroes>',
  directives: [HeroesComponent]
})
export class AppComponent { }
