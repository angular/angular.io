// #docplaster
// #docregion
// #docregion rxjs-operator-import
import 'rxjs/add/operator/switchMap';
// #docregion rxjs-operator-import
// #docregion route-animation-imports
import { Component, OnInit, HostBinding,
         trigger, transition, animate,
         style, state } from '@angular/core';
// #enddocregion route-animation-imports
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Hero, HeroService }  from './hero.service';

// #docregion route-animation
@Component({
  template: `
  <h2>HEROES</h2>
  <div *ngIf="hero">
    <h3>"{{ hero.name }}"</h3>
    <div>
      <label>Id: </label>{{ hero.id }}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoHeroes()">Back</button>
    </p>
  </div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
// #docregion route-animation-host-binding
export class HeroDetailComponent implements OnInit {
// #enddocregion route-animation
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  hero: Hero;

  // #docregion ctor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {}
  // #enddocregion ctor

  // #docregion ngOnInit
  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.service.getHero(+params['id']))
      .subscribe((hero: Hero) => this.hero = hero);
  }
  // #enddocregion ngOnInit

  // #docregion gotoHeroes-navigate
  gotoHeroes() {
    let heroId = this.hero ? this.hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }
  // #enddocregion gotoHeroes-navigate
// #docregion route-animation-host-binding
}
// #enddocregion route-animation-host-binding
