// ToH Promise Version
// #docplaster

// #docregion
import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Hero}           from './hero';

@Injectable()
export class HeroService {
  constructor (private http: Http) {}

  // URL to web api
  private _heroesUrl = 'app/heroes.json';

  // #docregion methods
  getHeroes (): Promise<Hero[]> {
    return this.http.get(this._heroesUrl)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
  }

  addHero (name: string): Promise<Hero> {
    let body = JSON.stringify({ name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._heroesUrl, body, options)
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }

// #enddocregion methods
}
// #enddocregion
