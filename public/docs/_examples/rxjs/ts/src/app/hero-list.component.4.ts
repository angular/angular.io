// #docplaster
// #docregion
// #docregion retry-when-operator
import 'rxjs/add/operator/retryWhen';
// #enddocregion retry-when-operator
import 'rxjs/add/observable/of';
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
    this.heroes$ = this.service.getFailedHeroes()
      .retryWhen((errors: any) => {
        return errors.scan((errorCount, err) => {
          if (errorCount >= 2) {
            throw err;
          }

          if (err.status !== 500) {
            return errorCount;
          } else {
            return errorCount + 1;
          }
        }, 0);
      })
      .catch(error => {
        console.log(`An error occurred: ${error}`);

        return Observable.of([]);
      });
  }
}
// #enddocregion
