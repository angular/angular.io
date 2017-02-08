// #docplaster
// #docregion
import 'rxjs/add/operator/takeUntil';
import { Component, OnInit, OnDestroy }   from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'hero-counter',
  template: `
    <h2>HERO COUNTER</h2>
    <p>
      Heroes {{ count }}
    </p>
  `
})
export class HeroCounterComponent implements OnInit, OnDestroy {
  count: number = 0;
  counter$: Observable<number>;
  sub: Subscription;
  onDestroy$ = new Subject();

  ngOnInit() {
    this.counter$ = Observable.create((observer: Observer<number>) => {
      setInterval(() => {
        observer.next(this.count++);
      }, 1000);
    });

    this.counter$
      .takeUntil(this.onDestroy$)
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.complete();
  }
}
// #enddocregion
