// #docregion
import { Component } from '@angular/core';

import { HeroesComponent, HeroService } from './heroes';

@Component({
  moduleId: module.id,
  selector: 'toh-app',
  template: `
      <toh-heroes></toh-heroes>
    `,
  styleUrls: ['app.component.css'],
  directives: [HeroesComponent],
  providers: [HeroService]
})
export class AppComponent { }
