// #docplaster
// #docregion
// #docregion imports
import { Injectable }       from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
// #enddocregion imports

// #docregion event-interface
export interface AppEvent {
  type: string;
  message: string;
}
// #enddocregion event-interface

@Injectable()
export class EventAggregatorService {
  _events: AppEvent[] = [];
  events$: BehaviorSubject<AppEvent[]>;

  constructor() {
    this._events = [];
    this.events$ = new BehaviorSubject(this._events);
  }

  add(event: AppEvent) {
    this._events.push(event);
    this.notify();
  }

  clear() {
    this._events = [];
    this.notify();
  }

  notify() {
    this.events$.next(this._events);
  }
}
