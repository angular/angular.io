// #docplaster
// #docregion
import { Injectable }               from '@angular/core';
import { Headers, Http,
         Response, RequestOptions } from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { Hero }           from './hero';

@Injectable()
export class HeroService {
  constructor (private http: Http) {}

  private heroesUrl = 'app/heroes';  // URL to web API

  getHeroes (): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  addHero (name: string): Observable<Hero> {
    let body = JSON.stringify({ name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.heroesUrl, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
