// #docregion
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import { HeroService } from './shared/index';

// #docregion example
@Injectable()
export class HeroArena {
  constructor(
    private heroService: HeroService,
    private http: Http) {}
}
// #enddocregion example
