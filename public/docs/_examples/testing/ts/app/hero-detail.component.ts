/* tslint:disable */
// #docplaster
// #docregion
// #docregion v2
// #docregion import-oninit
import { Component, OnInit } from '@angular/core';
// #enddocregion import-oninit
// #docregion import-route-params
import { RouteParams } from '@angular/router-deprecated';
// #enddocregion import-route-params

import { Hero } from './hero';
// #docregion import-hero-service
import { HeroService } from './hero.service';
// #enddocregion import-hero-service

// #docregion extract-template
@Component({
  selector: 'my-hero-detail',
  // #docregion template-url
  templateUrl: 'app/hero-detail.component.html',
  // #enddocregion template-url
// #enddocregion v2
  styleUrls: ['app/hero-detail.component.css'],
  inputs: ['hero']
// #docregion v2
})
// #enddocregion extract-template
// #docregion implement
export class HeroDetailComponent implements OnInit {
// #enddocregion implement
  hero: Hero;

// #docregion ctor
  constructor(
    private _heroService: HeroService,
    private _routeParams: RouteParams) {
  }
// #enddocregion ctor

// #docregion ng-oninit
  ngOnInit() {
    // #docregion get-id
    let id = +this._routeParams.get('id');
    // #enddocregion get-id
    this._heroService.getHero(id)
      .then(hero => this.hero = hero);
  }
// #enddocregion ng-oninit

// #docregion go-back
  goBack() {
    window.history.back();
  }
// #enddocregion go-back
}
// #enddocregion v2
// #enddocregion
