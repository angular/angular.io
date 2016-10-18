// #docplaster
// #docregion imports
import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';
// #enddocregion imports

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html'
})
// #docregion component
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail() { /* not implemented yet */}
}
