// #docregion
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero, HeroService } from './hero.service';

@Component({
  template: `
  <h2>HEROES</h2>
  <div *ngIf="hero">
    <h3>"{{hero.name}}"</h3>
    <div>
      <label>Id: </label>{{hero.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoHeroes()">Back</button>
    </p>
  </div>
  `,
})
export class HeroDetailComponent implements OnInit, OnDestroy  {
  hero: Hero;

  // #docregion ctor
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService) {}
  // #enddocregion ctor

  // #docregion OnActivate
  ngOnInit() {
    this.sub = this.route
     .params
     .subscribe(params => {
       let id =+ params['id'];
       this.service.getHero(id)
         .then(hero => this.hero = hero);
     });
  }
  // #enddocregion OnActivate

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // #docregion gotoHeroes
  gotoHeroes() {
    let heroId = this.hero ? this.hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Add a totally useless `foo` parameter for kicks.
    this.router.navigate(['/heroes'], { queryParameters: { id: heroId, foo: 'foo' } });
  }
  // #enddocregion gotoHeroes
}
