/* tslint:disable:member-ordering */
// #docregion
import { Component, OnInit } from '@angular/core';

import { Hero, heroes } from './data-model';

/*  Todo: Restore this one?
      <hero-detail></hero-detail>
*/
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'demo.component.html',
  styles: [
    '.selected {font-weight: bold; color: purple }',
    '.demo {max-width: 30em;}'
  ]
})
export class DemoComponent implements OnInit {

  demos: string[] = [1, 2, 3, 4, 5 , 6, 7].map(n => 'Demo ' + n);
  demo = this.demos.length; // Starting demo

  heroes: Hero[];
  selectedHero: Hero;

  ngOnInit() {
    // simulates latency of getting data from the server
    setTimeout(() => this.heroes = heroes, 1000);
  }

  select(hero: Hero) { this.selectedHero = hero; }
}
