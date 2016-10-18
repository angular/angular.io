// #docplaster
// #docregion
// #docregion import-oninit, v2
import { Component, OnInit, OnDestroy } from '@angular/core';
// #enddocregion import-oninit
// #docregion import-activated-route
import { ActivatedRoute } from '@angular/router';
// #enddocregion import-activated-route

import { Hero } from './hero';
// #docregion import-hero-service
import { HeroService } from './hero.service';
// #enddocregion import-hero-service

// #docregion extract-template
@Component({
  selector: 'my-hero-detail',
  // #docregion template-url
  templateUrl: 'app/hero-detail.component.html',
  // #enddocregion template-url, v2
  styleUrls: ['app/hero-detail.component.css']
  // #docregion v2
})
// #enddocregion extract-template
// #docregion implement
export class HeroDetailComponent implements OnInit, OnDestroy {
  // #enddocregion implement
  hero: Hero;
  sub: any;

  // #docregion ctor
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {
  }
  // #enddocregion ctor

  // #docregion ng-oninit
  ngOnInit() {
    // #docregion get-id
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
    // #enddocregion get-id
  }
  // #enddocregion ng-oninit

  // #docregion ng-ondestroy
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  // #enddocregion ng-ondestroy

  // #docregion go-back
  goBack() {
    window.history.back();
  }
// #enddocregion go-back
}
