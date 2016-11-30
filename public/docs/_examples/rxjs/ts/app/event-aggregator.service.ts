import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface AppEvent {
  type: string;
  message: string;
}

@Injectable()
export class EventAggregatorService {
  _events: AppEvent[];
  events$: BehaviorSubject<AppEvent[]> = new BehaviorSubject<any>([]);

  add(event: AppEvent) {
    this._events.push(event);
    this.next();
  }

  clear() {
    this._events = [];
    this.next();
  }

  next() {
    this.events$.next(this._events);
  }
}
