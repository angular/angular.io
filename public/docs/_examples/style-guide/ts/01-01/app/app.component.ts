// #docregion
import { Component } from '@angular/core';

import { HeroService } from './heroes';

@Component({
  moduleId: module.id,
  selector: 'toh-app',
  template: `
      <toh-heroes></toh-heroes>
    `,
  styleUrls: ['./app.component.css'],
  providers: [ HeroService ]
})
export class AppComponent { }
