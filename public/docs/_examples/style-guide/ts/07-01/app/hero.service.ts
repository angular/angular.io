// #docregion
import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  getHeroes() {
    return this.http.get('api/heroes')
      .map((response: Response) => <Hero[]>response.json().data)
  }
}
