// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
// #docregion import-router
import { Router } from '@angular/router';
// #enddocregion import-router
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  // #docregion template-url
  templateUrl: 'app/dashboard.component.html',
  // #enddocregion template-url
  // #docregion css
  styleUrls: ['app/dashboard.component.css'],
  // #enddocregion css
  directives: [ROUTER_DIRECTIVES]
})
// #docregion component
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  // #docregion ctor
  constructor(private router: Router,
              private heroService: HeroService) {
  }

  // #enddocregion ctor

  ngOnInit() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  // TODO Move in docs
  // #docregion goto-detail
  // ....
  // #enddocregion goto-detail
}
