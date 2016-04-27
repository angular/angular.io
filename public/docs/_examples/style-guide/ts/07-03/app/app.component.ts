// #docregion
import { Component } from '@angular/core';

import { HeroListComponent } from './heroes/hero-list.component';
import { HeroService } from './heroes/shared/hero.service';

@Component({
  selector: 'toh-app',
  template: `
      <toh-heroes></toh-heroes>
    `,
  directives: [HeroListComponent],
  providers: [HeroService]
})
export class AppComponent {}
