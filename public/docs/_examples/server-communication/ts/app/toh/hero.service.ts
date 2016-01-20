// #docplaster

// #docregion
// #docregion v1
import {Injectable} from 'angular2/core';
import {Http}       from 'angular2/http';
import {Hero}       from './hero';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HeroService {
  constructor (private http: Http) {}

  private _heroesUrl = 'app/heroes.json';

  // #docregion error-handling
  getHeroes () {
    // #docregion http-get
    return this.http.get(this._heroesUrl)
                    .map(res => <Hero[]> res.json().data)
                    .catch(this.logAndPassOn);
    // #enddocregion http-get
  }

  // #docregion logAndPassOn
  private logAndPassOn (error: Error) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error);
  }
// #enddocregion logAndPassOn
// #enddocregion error-handling
// #enddocregion v1

  // #docregion addhero
  addHero (name: string) : Observable<Hero>  {
    return this.http.post(this._heroesUrl, JSON.stringify({ name }))
                    .map(res =>  <Hero> res.json().data)
                    .catch(this.logAndPassOn)
  }
  // #enddocregion addhero
// #docregion v1
}
// #enddocregion v1
// #enddocregion
