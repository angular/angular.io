// #docregion
import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Component({
<<<<<<< HEAD:public/docs/_examples/toh-6/ts/src/app/hero-detail.component.ts
  selector: 'my-hero-detail',
=======
  moduleId: module.id,
  selector: 'hero-detail',
>>>>>>> docs(toh-3): heavy copy edit; my-hero-detail -> hero-detail:public/docs/_examples/toh-6/ts/app/hero-detail.component.ts
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  // #docregion save
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
  // #enddocregion save

  goBack(): void {
    this.location.back();
  }
}
