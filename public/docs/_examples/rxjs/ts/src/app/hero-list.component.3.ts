// #docplaster
// #docregion
import { Component, OnInit }   from '@angular/core';
import { Observable }          from 'rxjs/Observable';

import { HeroService }   from './hero.service';
import { Hero }          from './hero';

@Component({
  template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes$ | async">
        <span class="badge">{{ hero.id }}</span> {{ hero.name }}
      </li>
    </ul>
  `
})
export class HeroListComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor(
    private service: HeroService
  ) {}

  ngOnInit() {
    this.heroes$ = this.service.getHeroes(true); // Simulate a failed request
  }
}
// #enddocregion
