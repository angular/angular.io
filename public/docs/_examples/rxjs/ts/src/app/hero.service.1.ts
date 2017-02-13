// #docplaster
// #docregion
import 'rxjs/add/operator/map';
import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'api/heroes';

  constructor(
    private http: Http
  ) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
      .map(response => response.json().data as Hero[]);
  }
}
