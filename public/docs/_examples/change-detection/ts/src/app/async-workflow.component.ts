import { Component, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/take';

@Component({
  selector: 'hero-async-workflow',
  template: `
    <button (click)="loadInsideZone()">Start loading inside NgZone</button>
    <button (click)="loadOutsideZone()">Start loading outside NgZone</button>
    Results:
    <ul>
      <li *ngFor="let itm of results">
        {{ itm }}
      </li>
    </ul>
  `
})
export class AsyncWorkflowComponent {
  results: string[];

  // #docregion outside-zone
  constructor(private ngZone: NgZone) { }
  // #enddocregion outside-zone

  // #docregion inside-zone
  loadInsideZone() {
    Observable.merge(loadHeroes(), loadMoreHeroes(), loadEvenMoreHeroes())
      .reduce((heroes, hero) => [...heroes, hero], [])
      .subscribe(heroes => this.results = heroes);
  }
  // #enddocregion inside-zone

  // #docregion outside-zone
  loadOutsideZone() {
    // Escape NgZone before starting work.
    // No change detection will be performed during this work.
    this.ngZone.runOutsideAngular(() => {
      Observable.merge(loadHeroes(), loadMoreHeroes(), loadEvenMoreHeroes())
        .reduce((heroes, hero) => [...heroes, hero], [])
        .subscribe(heroes => {
          // Re-enter zone to process final result.
          // Change detection will be performed.
          this.ngZone.run(() => this.results = heroes);
        });
    });
  }
  // #enddocregion outside-zone

}

function loadHeroes() {
  return Observable.interval(100)
    .map(n => `hero a${n}`)
    .take(3);
}

function loadMoreHeroes() {
  return Observable.interval(150)
    .map(n => `hero b${n}`)
    .take(3);
}

function loadEvenMoreHeroes() {
  return Observable.interval(200)
    .map(n => `hero c${n}`)
    .take(3);
}
