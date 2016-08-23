// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';

import { Hero } from './shared';

// #docregion example
@Component({
  // #enddocregion example
  moduleId: module.id,
  // #docregion example
  selector: 'toh-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls:  ['heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  ngOnInit() { }
}
// #enddocregion example
