// #docplaster
// #docregion , v2
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero }         from './hero';
import { HeroService }  from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  // #docregion templateUrl
  templateUrl: 'hero-detail.component.html',
  // #enddocregion templateUrl, v2
  styleUrls: [ 'hero-detail.component.css' ]
  // #docregion v2
})
// #docregion implement
export class HeroDetailComponent implements OnInit {
// #enddocregion implement
  hero: Hero;

  // #docregion ctor
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
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
    this.location.back();
  }
// #enddocregion goBack
}
