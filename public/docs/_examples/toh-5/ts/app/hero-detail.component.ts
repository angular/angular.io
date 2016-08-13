// #docplaster
// #docregion
// #docregion import-oninit, v2
import { Component, OnInit } from '@angular/core';
// #enddocregion import-oninit
// #docregion router
import { ActivatedRoute, Params } from '@angular/router';
// #enddocregion router

import { Hero } from './hero';
// #docregion import-hero-service
import { HeroService } from './hero.service';
// #enddocregion import-hero-service

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
  ngOnInit() {
    // #docregion get-id
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
    // #enddocregion get-id
  }
  // #enddocregion ngOnInit

  // #docregion goBack
  goBack() {
    window.history.back();
  }
// #enddocregion goBack
}
