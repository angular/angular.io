// #docregion
import { Component, OnInit } from '@angular/core';

import { Hero } from './shared';
// #docregion example
import { Logger } from '../shared';
// #enddocregion example

@Component({
  moduleId: module.id,
  selector: 'toh-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls:  ['heroes.component.css'],
  providers: [Logger]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  ngOnInit() { }
}
