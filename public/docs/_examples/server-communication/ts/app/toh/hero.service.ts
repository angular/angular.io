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
  // #docregion error-handling, http-get
  getHeroes (): Observable<Hero[]> {
    return this.http.get(this._heroesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  // #enddocregion error-handling, http-get
  // #enddocregion v1

  // #docregion addhero
  addHero (name: string): Observable<Hero>  {

    let body = JSON.stringify({ name });
    // #docregion headers
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._heroesUrl, body, options)
    // #enddocregion headers
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  // #enddocregion addhero

  // #docregion v1

  // #docregion extract-data
  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.data || { };
  }
  // #enddocregion extract-data

  // #docregion error-handling
  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  // #enddocregion error-handling
  // #enddocregion methods
}
// #enddocregion
