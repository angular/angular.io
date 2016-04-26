// #docregion
import { Component } from 'angular2/core';

// #docregion example
@Component({
  selector: 'toh-heroes-list',
  template: `
    <section>
      Our list of heroes:
      <hero-profile *ngFor="#hero of heroes" [hero]="hero">
      </hero-profile>
      Total powers: {{totalPowers}}<br>
      Average power: {{avgPower}}
    </section>
  `
})
export class HeroesListComponent {
  heroes: Hero[];
  totalPowers: number;
  avgPower: number;
}
// #enddocregion example
