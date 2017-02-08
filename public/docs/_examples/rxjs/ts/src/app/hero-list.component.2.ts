// #docplaster
// #docregion
// #docregion retry-operator
import 'rxjs/add/operator/retry';
// #enddocregion retry-operator
import 'rxjs/add/observable/of';
// #docregion failed-heroes
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
    // #docregion failed-heroes
    this.heroes$ = this.service.getFailedHeroes()
    // #enddocregion failed-heroes
      .catch((error: any) => {
        console.log(`An error occurred: ${error}`);

        return Observable.of([]);
      });
    // #docregion failed-heroes
  }
}
// #enddocregion
