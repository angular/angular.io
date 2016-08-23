// #docplaster
// #docregion
// Observable Version
// #docregion v1
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
// #enddocregion v1
// #docregion import-request-options
import { Headers, RequestOptions } from '@angular/http';
// #enddocregion import-request-options
// #docregion v1

import { Hero }           from './hero';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class HeroService {
  // #docregion ctor
  constructor (private http: Http) {}
  // #enddocregion ctor

  // #docregion endpoint
  private heroesUrl = 'app/heroes';  // URL to web API
  // #enddocregion endpoint

  // #docregion methods, error-handling, http-get
  getHeroes (): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  // #enddocregion error-handling, http-get, v1

  // #docregion addhero, addhero-sig
  addHero (name: string): Observable<Hero> {
  // #enddocregion addhero-sig
    let body = JSON.stringify({ name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.heroesUrl, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  // #enddocregion addhero

  // #docregion v1, extract-data
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  // #enddocregion extract-data

  // #docregion error-handling
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  // #enddocregion error-handling, methods
}
// #enddocregion

/*
  // #docregion endpoint-json
  private heroesUrl = 'app/heroes.json'; // URL to JSON file
  // #enddocregion endpoint-json
*/
