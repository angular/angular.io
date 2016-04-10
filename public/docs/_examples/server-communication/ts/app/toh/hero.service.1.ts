/* Promise version */
// #docplaster

// #docregion
import {Injectable}     from 'angular2/core';
import {Http}           from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Hero}           from './hero';

@Injectable()
export class HeroService {
  constructor (private http: Http) {}

  // URL to web api
  private _heroesUrl = 'app/heroes.json';

  // #docregion methods
  getHeroes () {
    return this.http.get(this._heroesUrl)
                    .toPromise()
                    .then(res => <Hero[]> res.json().data, this.handleError)
                    .then(data => { console.log(data); return data; }); // eyeball results in the console
  }

  addHero (name: string) : Promise<Hero> {
    let body = JSON.stringify({ name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._heroesUrl, body, options)
               .toPromise()
               .then(res => <Hero> res.json().data)
               .catch(this.handleError);
  }
  private handleError (error: any) {
    // in a real world app, we may send the error to some remote logging infrastructure
    console.error(error); // log to console instead
    let errMsg = error.message || 'Server error';
    return Promise.reject(errMsg);
  }

// #enddocregion methods
}
// #enddocregion
