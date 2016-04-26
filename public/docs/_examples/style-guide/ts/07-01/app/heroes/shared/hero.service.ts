// #docregion
import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';

import { Hero } from './hero.model';

@Injectable()
// #docregion example
export class HeroService {
  constructor(private http: Http) { }

  getHeroes() {
    return this.http.get('api/heroes')
      .map((response: Response) => <Hero[]>response.json().data);
  }
}
// #enddocregion example
