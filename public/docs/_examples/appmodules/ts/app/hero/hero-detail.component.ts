import { Component, OnInit } from '@angular/core'
import { ActivatedRoute }    from '@angular/router'

import { Hero,
         HeroService }    from './hero.service';

@Component({
  template: `
    <h3 highlight>Hero Detail</h3>
    <div *ngIf="hero">
      <label>Id: {{hero.id}}</label><br>
      <label>Name:
        <input [(ngModel)]="hero.name">
      </label>
    </div>
    <br>
    <a routerLink="../">Hero List</a>
  `
})
export class HeroDetail implements OnInit {
  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.params['id'], 10);
    this.heroService.getHero(id).then(hero => this.hero = hero);
  }
}
