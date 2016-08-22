// #docplaster
// #docregion
// Promise Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Hero }           from './hero';

@Injectable()
export class HeroService {
  // URL to web api
  private heroesUrl = 'app/heroes.json';

  constructor (private http: Http) {}

  // #docregion methods
  getHeroes (): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
  }

  addHero (name: string): Promise<Hero> {
    let body = JSON.stringify({ name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.heroesUrl, body, options)
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }

// #enddocregion methods
}
// #enddocregion
