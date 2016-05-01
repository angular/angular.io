// #docregion
import { Component } from 'angular2/core';

import { Hero } from '../shared/hero.model.ts';

// #docregion example
@Component({
  selector: 'toh-hero-list',
  template: `
    <section>
      Our list of heroes:
      <hero-profile *ngFor="let hero of heroes" [hero]="hero">
      </hero-profile>
      Total powers: {{totalPowers}}<br>
      Average power: {{avgPower}}
    </section>
  `
})
export class HeroListComponent {
  heroes: Hero[];
  totalPowers: number;

  get avgPower() {
    return this.totalPowers / this.heroes.length;
  }
}
// #enddocregion example
