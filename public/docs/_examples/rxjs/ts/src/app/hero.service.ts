// #docplaster
// #docregion
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';

import { Hero } from './hero';
import { ApiError, ApiErrorHandlerService } from './api-error-handler.service';

@Injectable()
export class HeroService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'api/heroes';

  constructor(
    private http: Http,
    private errorHandler: ApiErrorHandlerService
  ) {}

  addHero(hero: Hero) {
    return this.http.post(this.heroesUrl, JSON.stringify({ name: hero.name }), { headers: this.headers });
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
      .map(response => response.json().data as Hero[]);
  }

  getHero(id: number): Observable<Hero | ApiError> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .map(response => response.json().data as Hero)
      .catch(this.errorHandler.handle);
  }

  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`${this.heroesUrl}/?name=${term}`)
      .map((r: Response) => r.json().data as Hero[]);
  }
}
