// #docregion
import { Component } from '@angular/core';

import { HeroListComponent, HeroService } from './heroes';

@Component({
  selector: 'toh-app',
  template: `
      <toh-heroes></toh-heroes>
    `,
  directives: [HeroListComponent],
  providers: [HeroService]
})
export class AppComponent {}
