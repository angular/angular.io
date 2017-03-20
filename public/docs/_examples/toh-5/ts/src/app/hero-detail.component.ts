// #docplaster
// #docregion , v2, rxjs-import
import 'rxjs/add/operator/switchMap';
// #enddocregion rxjs-import
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero }         from './hero';
import { HeroService }  from './hero.service';
// #docregion metadata
@Component({
<<<<<<< HEAD:public/docs/_examples/toh-5/ts/src/app/hero-detail.component.ts
  selector: 'my-hero-detail',
=======
  moduleId: module.id,
  selector: 'hero-detail',
>>>>>>> docs(toh-3): heavy copy edit; my-hero-detail -> hero-detail:public/docs/_examples/toh-5/ts/app/hero-detail.component.ts
  templateUrl: './hero-detail.component.html',
  // #enddocregion metadata, v2
  styleUrls: [ './hero-detail.component.css' ]
  // #docregion metadata, v2
})
// #enddocregion metadata
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
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }
  // #enddocregion ngOnInit

  // #docregion goBack
  goBack(): void {
    this.location.back();
  }
// #enddocregion goBack
}
