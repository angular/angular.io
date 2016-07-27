// #docplaster
// #docregion , v2
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  // #docregion templateUrl
  templateUrl: 'app/hero-detail.component.html',
  // #enddocregion templateUrl, v2
  styleUrls: ['app/hero-detail.component.css']
  // #docregion v2
})
// #docregion implement
export class HeroDetailComponent implements OnInit {
// #enddocregion implement
  hero: Hero;

  // #docregion ctor
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {
  }
  // #enddocregion ctor

  // #docregion ngOnInit
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
  }
  // #enddocregion ngOnInit

  // #docregion goBack
  goBack(): void {
    window.history.back();
  }
// #enddocregion goBack
}
