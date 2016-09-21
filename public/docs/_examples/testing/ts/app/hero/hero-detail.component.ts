/* tslint:disable:member-ordering */
// #docplaster
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import 'rxjs/add/operator/pluck';

import { Hero }              from '../model';
import { HeroDetailService } from './hero-detail.service';

// #docregion prototype
@Component({
  selector:    'app-hero-detail',
  templateUrl: 'app/hero/hero-detail.component.html',
  styleUrls:  ['app/hero/hero-detail.component.css'],
  providers:  [ HeroDetailService ]
})
export class HeroDetailComponent implements OnInit {
  // #docregion ctor
  constructor(
    private heroDetailService: HeroDetailService,
    private route:  ActivatedRoute,
    private router: Router) {
  }
  // #enddocregion ctor
// #enddocregion prototype

  @Input() hero: Hero;

  // #docregion ng-on-init
  ngOnInit(): void {
    // get hero when `id` param changes
    this.route.params.pluck<string>('id')
      .forEach(id => this.getHero(id))
      .catch(() => this.hero = new Hero()); // no id; should edit new hero
  }
  // #enddocregion ng-on-init

  private getHero(id: string): void {
    this.heroDetailService.getHero(id).then(hero => {
      if (hero) {
        this.hero = hero;
      } else {
        this.gotoList(); // id not found; navigate to list
      }
    });
  }

  save(): void {
    this.heroDetailService.saveHero(this.hero).then(() => this.gotoList());
  }

  cancel() { this.gotoList(); }

  gotoList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
// #docregion prototype
}
// #enddocregion prototype
