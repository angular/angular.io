// Early versions

// #docregion
import { Component }         from '@angular/core';

import { CarComponent }      from './car/car.component';
import { HeroesComponent }   from './heroes/heroes.component.1';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <my-car></my-car>
    <my-heroes></my-heroes>
  `,
  directives: [CarComponent, HeroesComponent]
})

export class AppComponent {
  title = 'Dependency Injection';
}
