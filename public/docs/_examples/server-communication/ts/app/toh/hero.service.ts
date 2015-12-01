// #docplaster

// #docregion
// #docregion v1
import {Injectable} from 'angular2/core';
import {Http}       from 'angular2/http';
import {Hero}       from './hero';

@Injectable()
export class HeroService {
  constructor (private http: Http) {}

  private _heroesUrl = 'app/toh/heroes.json';

  getHeroes () {
    // TODO: Error handling
    // #docregion http-get
    return this.http.get(this._heroesUrl)
                    .map(res => <Hero[]> res.json().items);
    // #enddocregion http-get
  }
// #enddocregion v1

  // #docregion addhero
  addHero (name: string) {
    // CHRISTOPH: What are we sending back to the consumer?
    // Surely not the response object ... after we told the reader that's bad.

    // TODO: Error handling
    return this.http.post(this._heroesUrl, JSON.stringify({ name: 'name' }));
  }
  // #enddocregion addhero
// #docregion v1
}
// #enddocregion v1
// #enddocregion
