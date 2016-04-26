// #docregion
import { Injectable } from 'angular2/core';

// #docregion example
@Injectable()
export class HeroArena {
  constructor(
    private heroFactory: HeroFactory,
    private http: Http) {}
}
// #enddocregion example
