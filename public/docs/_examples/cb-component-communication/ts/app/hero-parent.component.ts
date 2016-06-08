// #docregion
import { Component } from '@angular/core';

import { HeroChildComponent } from './hero-child.component';
import { HEROES } from './hero';

@Component({
  selector: 'hero-parent',
  template: `
    <h2>{{master}} controls {{heroes.length}} heroes</h2>
    <hero-child *ngFor="let hero of heroes"
      [hero]="hero"
      [master]="master">
    </hero-child>
  `,
  directives: [HeroChildComponent]
})
export class HeroParentComponent {
  heroes = HEROES;
  master: string = 'Master';
}
// #enddocregion
