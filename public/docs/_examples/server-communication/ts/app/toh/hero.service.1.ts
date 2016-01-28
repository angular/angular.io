/* Promise version */
// #docplaster

// #docregion
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Hero}           from './hero';

@Injectable()
export class HeroService {
  constructor (private http: Http) {}

  private _heroesUrl = 'app/heroes';

  // #docregion methods
  getHeroes () {
    return this.http.get(this._heroesUrl)
                    .toPromise()
                    .then(res => <Hero[]> res.json().data, this.handleError);
  }

  addHero (name: string) : Promise<Hero> {
    return this.http.post(this._heroesUrl, JSON.stringify({ name }))
               .toPromise()
               .then(res => <Hero> res.json().data)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Promise.reject(error.message || error.json().error || 'Server error');
  }
// #enddocregion methods
}
// #enddocregion
