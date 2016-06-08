// #docregion
import { Component }          from '@angular/core';

import { HeroListComponent }  from './hero-list.component';
import { heroServiceProvider } from './hero.service.provider';

@Component({
  selector: 'my-heroes',
  template: `
  <h2>Heroes</h2>
  <hero-list></hero-list>
  `,
  providers: [heroServiceProvider],
  directives: [HeroListComponent]
})
export class HeroesComponent { }
