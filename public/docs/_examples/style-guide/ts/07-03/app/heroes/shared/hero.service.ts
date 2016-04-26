// #docregion
import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Rx';

import { Hero } from './hero.model.ts';

@Injectable()
export class HeroService {
  getHeroes() {
    let heroes: Hero[] = [];
    return Observable.of(heroes);
  }
}
