// #docplaster
// #docregion
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';

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
  // #docregion ngOnInit
  private sub: any;

  // #enddocregion ngOnInit
  // #docregion ctor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService) {}
  // #enddocregion ctor

  // #docregion ngOnInit
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       let id = +params['id']; // (+) converts string 'id' to a number
       this.service.getHero(id).then(hero => this.hero = hero);
     });
  }
  // #enddocregion ngOnInit

  // #docregion ngOnDestroy
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  // #enddocregion ngOnDestroy

  // #docregion gotoHeroes
  gotoHeroes() { this.router.navigate(['/heroes']); }
  // #enddocregion gotoHeroes
}
