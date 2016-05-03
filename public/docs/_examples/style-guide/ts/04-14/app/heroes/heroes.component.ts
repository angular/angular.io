// #docregion
import { Component, OnInit } from '@angular/core';

import { Hero } from './shared/hero.model';
// #docregion example
import { Logger } from '../shared/logger.service';
// #enddocregion example

@Component({
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
