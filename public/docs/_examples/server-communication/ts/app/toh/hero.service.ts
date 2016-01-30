// #docplaster

// #docregion
// #docregion v1
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Hero}           from './hero';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class HeroService {
  constructor (private http: Http) {}

  // #docregion endpoint
  private _heroesUrl = 'app/heroes';
  // #enddocregion endpoint

  // #docregion methods
  // #docregion error-handling
  getHeroes () {
    // #docregion http-get
    return this.http.get(this._heroesUrl)
                    .map(res => <Hero[]> res.json().data)
                    .catch(this.handleError);
    // #enddocregion http-get
  }
  // #enddocregion error-handling
  // #enddocregion v1
  
  // #docregion addhero
  addHero (name: string) : Observable<Hero>  {
    return this.http.post(this._heroesUrl, JSON.stringify({ name }))
                    .map(res =>  <Hero> res.json().data)
                    .catch(this.handleError)
  }
  // #enddocregion addhero

  // #docregion v1
  // #docregion error-handling
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  // #enddocregion error-handling
  // #enddocregion methods
}
// #enddocregion
