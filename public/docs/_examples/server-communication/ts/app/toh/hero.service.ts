// #docplaster

// #docregion
// #docregion v1
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
// #enddocregion v1
// #docregion import-request-options
import {Headers, RequestOptions} from 'angular2/http';
// #enddocregion import-request-options
// #docregion v1
import {Hero}           from './hero';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class HeroService {
  constructor (private http: Http) {}
// #enddocregion
// #enddocregion v1

  /*
  // #docregion endpoint-json
  private _heroesUrl = 'app/heroes.json'; // URL to JSON file
  // #enddocregion endpoint-json
  */
// #docregion
// #docregion v1

  // #docregion endpoint
  private _heroesUrl = 'app/heroes';  // URL to web api
  // #enddocregion endpoint

  // #docregion methods
  // #docregion error-handling
  getHeroes () {
    // #docregion http-get, http-get-v1
    return this.http.get(this._heroesUrl)
                    .map(res => <Hero[]> res.json().data)
                    // #enddocregion v1, http-get-v1, error-handling
                    .do(data => console.log(data)) // eyeball results in the console
                    // #docregion v1, http-get-v1, error-handling
                    .catch(this.handleError);
    // #enddocregion http-get, http-get-v1
  }
  // #enddocregion error-handling
  // #enddocregion v1

  // #docregion addhero
  addHero (name: string) : Observable<Hero>  {

    let body = JSON.stringify({ name });
    //#docregion headers
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._heroesUrl, body, options)
    //#enddocregion headers
                    .map(res =>  <Hero> res.json().data)
                    .catch(this.handleError)
  }
  // #enddocregion addhero

  // #docregion v1
  // #docregion error-handling
  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  // #enddocregion error-handling
  // #enddocregion methods
}
// #enddocregion
