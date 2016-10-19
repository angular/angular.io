// #docplaster
// #docregion
// TODO SOMEDAY: Feature Componetized like CrisisCenter
import { Component, OnInit } from '@angular/core';
// #docregion import-router
import { Router, ActivatedRoute, Params } from '@angular/router';
// #enddocregion import-router

import { Hero, HeroService }  from './hero.service';

@Component({
  // #docregion template
  template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
  `
  // #enddocregion template
})
export class HeroListComponent implements OnInit {
  heroes: Hero[];

  // #docregion ctor
  private selectedId: number;

  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  // #enddocregion ctor

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
        this.selectedId = +params['id'];
        this.service.getHeroes()
          .then(heroes => this.heroes = heroes);
      });
  }
  // #enddocregion ctor

  // #docregion isSelected
  isSelected(hero: Hero) { return hero.id === this.selectedId; }
  // #enddocregion isSelected

  // #docregion select
  onSelect(hero: Hero) {
    this.router.navigate(['/hero', hero.id]);
  }
  // #enddocregion select

}
// #enddocregion
